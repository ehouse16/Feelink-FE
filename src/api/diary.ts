const API_URL = 'http://localhost:8080/api/diaries';

export async function createDiary(data: { title: string; content: string }) {
  const res = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('일기 등록 실패');
  return res.json();
}

export async function getMyDiaries() {
  const res = await fetch(`${API_URL}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('일기 목록 조회 실패');
  return res.json();
} 