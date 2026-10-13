import { request } from "../core/request";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ParamValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | (string | number)[];

export type Params = Record<string, ParamValue>;

export interface RequestOptions {
  method?: Method; // default "GET"
  params?: Params; // query string: ?page=1&search=kopi
  body?: unknown; // otomatis di-JSON-kan (FormData dibiarkan apa adanya)
  headers?: Record<string, string>;
  token?: string; // shortcut untuk Authorization: Bearer <token>
  signal?: AbortSignal;
  cache?: RequestCache;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export const api = <T = unknown>(path: string, options?: RequestOptions) =>
  request<T>(path, options);
