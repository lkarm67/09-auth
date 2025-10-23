// lib/api/clientApi.ts
export interface RegisterData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Registration failed');
  }

  return res.json(); // повертає користувача або токен
};
