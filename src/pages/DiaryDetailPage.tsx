import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

function formatDate(dateString: string) {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

async function fetchDiary(id: string) {
  const res = await fetch(`http://localhost:8080/api/diaries/${id}`, {
    credentials: 'include',
  });
  if (res.status === 401) throw new Error('로그인이 필요한 서비스입니다.');
  if (!res.ok) throw new Error('일기 조회 실패');
  return res.json();
}

export default function DiaryDetailPage({ nickname, onLoginClick, onSignUpClick, onLogoutClick, onWriteClick }: {
  nickname: string | null;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onLogoutClick: () => void;
  onWriteClick: () => void;
}) {
  const { id } = useParams();
  const [diary, setDiary] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchDiary(id)
      .then(res => setDiary(res.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa' }}>
      <Header
        nickname={nickname}
        onLoginClick={onLoginClick}
        onSignUpClick={onSignUpClick}
        onLogoutClick={onLogoutClick}
        onWriteClick={onWriteClick}
      />
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 80 }}>로딩 중...</div>
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center', marginTop: 80 }}>{error}</div>
      ) : diary ? (
        <div style={{ maxWidth: 600, margin: '60px auto', background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h2 style={{ color: '#f7c9c9', marginBottom: 16 }}>{diary.title}</h2>
          <div style={{ color: '#888', marginBottom: 8 }}>작성자: {diary.nickName}</div>
          <div style={{ color: '#888', marginBottom: 12 }}>작성일: {formatDate(diary.createdAt)}</div>
          <div style={{ color: '#f7c9c9', fontWeight: 600, marginBottom: 20 }}>감정: {diary.emotionType}</div>
          <div style={{ color: '#222', fontSize: 17, whiteSpace: 'pre-line' }}>{diary.content}</div>
        </div>
      ) : null}
    </div>
  );
} 