import { message } from "antd";
import { ApiError, type Params, type RequestOptions } from "../methods";
import { getToken, removeToken } from "@/utils/auth";

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
const isBrowser = typeof window !== "undefined";

function buildUrl(path: string, params?: Params): string {
  const base = /^https?:\/\//.test(path) ? path : `${BASE_URL}${path}`;
  if (!params) return base;

  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value))
      value.forEach((v) => query.append(key, String(v)));
    else query.append(key, String(value));
  }

  const qs = query.toString();
  if (!qs) return base;
  return `${base}${base.includes("?") ? "&" : "?"}${qs}`;
}

async function parseBody(res: Response): Promise<unknown> {
  if (res.status === 204) return null;
  const type = res.headers.get("content-type") ?? "";
  return type.includes("application/json")
    ? res.json().catch(() => null)
    : res.text();
}

export async function request<T>(
  path: string,
  {
    method = "GET",
    params,
    body,
    headers,
    token,
    signal,
    cache,
  }: RequestOptions = {},
): Promise<T> {
  const authToken = token ?? (isBrowser ? getToken() : null);
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;
  const hasBody = body !== undefined && method !== "GET";

  const res = await fetch(buildUrl(path, params), {
    method,
    signal,
    cache,
    headers: {
      Accept: "application/json",
      ...(hasBody && !isForm ? { "Content-Type": "application/json" } : {}),
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
    body: hasBody
      ? isForm
        ? (body as FormData)
        : JSON.stringify(body)
      : undefined,
  });

  const data = await parseBody(res);

  if (!res.ok) {
    const msg =
      (data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : null) ?? res.statusText;

    // Request yang membawa token: tangani error di sini supaya page tidak perlu
    if (authToken && isBrowser) {
      if (res.status === 401) {
        removeToken();
        window.location.href = "/login";
      } else {
        message.error({ content: msg, key: "api-error" });
      }
    }

    throw new ApiError(res.status, msg, data);
  }

  return data as T;
}
