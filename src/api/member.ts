const API_URL = 'http://localhost:8080/api/members';

export async function signUp(data: { email: string; password: string; nickname: string }) {
  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('회원가입 실패');
  return res.json();
}

export async function logIn(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('로그인 실패');
  return res.json();
}

export async function logOut() {
  const res = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('로그아웃 실패');
  return res.json();
} 