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

export async function checkEmail(email: string) {
  const res = await fetch(`${API_URL}/check-email/${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error('이메일 중복 검사 실패');
  const data = await res.json();
  return data.data as boolean;
}

export async function checkNickname(nickname: string) {
  const res = await fetch(`${API_URL}/check-nickname/${encodeURIComponent(nickname)}`);
  if (!res.ok) throw new Error('닉네임 중복 검사 실패');
  const data = await res.json();
  return data.data as boolean;
} 