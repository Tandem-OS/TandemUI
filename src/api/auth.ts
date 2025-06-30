const BASE_URL = "http://localhost:8000";

export const login = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const signup = async (email: string, password: string, full_name?: string, organization?: string) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, full_name, organization }),
  });
  return res.json();
};

export const forgotPassword = async (email: string) => {
  const res = await fetch(`${BASE_URL}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  return { success: res.ok, ...data };
};

export const resetPassword = async (password: string, token: string | null) => {
  if (!token) throw new Error("Missing reset token.");
  const res = await fetch(`${BASE_URL}/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, token }),
  });
  return res.json();
};

export const getUserInfo = async (token: string | null) => {
  if (!token) throw new Error("Missing token.");
  const res = await fetch(`${BASE_URL}/user-info`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};
