// 메인페이지용 API (/api/diaries)
const DIARIES_API_URL = 'http://localhost:8080/api/diaries';

// 마이페이지용 API (/api/my)
const MY_API_URL = 'http://localhost:8080/api/my';

// 메인페이지: 전체 일기 목록 조회
export async function fetchAllDiaries() {
  const res = await fetch(`${DIARIES_API_URL}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('일기 목록 조회 실패');
  return res.json();
}

// 메인페이지: 일기 등록
export async function createDiary(data: { title: string; content: string }) {
  const res = await fetch(`${DIARIES_API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('일기 등록 실패');
  return res.json();
}

// 마이페이지: 내 일기 전체 조회
export async function fetchMyDiaries() {
  const res = await fetch(`${MY_API_URL}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('내 일기 목록 조회 실패');
  return res.json();
}

// 마이페이지: 내 일기 상세 조회
export async function fetchMyDiary(diaryId: number) {
  const res = await fetch(`${MY_API_URL}/${diaryId}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('내 일기 상세 조회 실패');
  return res.json();
}

// 마이페이지: 내 일기 수정 (작성자만 가능)
export async function updateMyDiary(diaryId: number, data: { title: string; content: string }) {
  const res = await fetch(`${MY_API_URL}/${diaryId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!res.ok) {
    if (res.status === 403) {
      throw new Error('작성자만 수정할 수 있습니다');
    }
    throw new Error('일기 수정 실패');
  }
  return res.json();
}

// 마이페이지: 내 일기 삭제 (작성자만 가능)
export async function deleteMyDiary(diaryId: number) {
  const res = await fetch(`${MY_API_URL}/${diaryId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    if (res.status === 403) {
      throw new Error('작성자만 삭제할 수 있습니다');
    }
    throw new Error('일기 삭제 실패');
  }
  return res.json();
}

// 기존 함수명 호환성을 위한 별칭 (점진적 마이그레이션용)
export const getMyDiaries = fetchMyDiaries;
export const updateDiary = updateMyDiary;
export const deleteDiary = deleteMyDiary; 