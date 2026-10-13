const KEY = "token";

export function setToken(token: string, days = 1) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${KEY}=${encodeURIComponent(token)}; Path=/; Max-Age=${
    days * 86400
  }; SameSite=Lax${secure}`;
}

export function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const found = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${KEY}=`));
  return found ? decodeURIComponent(found.split("=")[1]) : null;
}

export function removeToken() {
  document.cookie = `${KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
}
