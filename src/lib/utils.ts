export function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export async function getUserToken() {
  const res = await fetch("/api/auth/token");
  if (!res.ok) return;
  const { token } = await res.json();
  return token;
}
