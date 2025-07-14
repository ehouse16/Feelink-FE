import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import DiaryCard from '../components/DiaryCard';
import { fetchMyDiaries } from '../api/diary';

export default function MyDiaryPage({ nickname, onLoginClick, onSignUpClick, onLogoutClick, onWriteClick, onMyDiaryClick }: {
  nickname: string | null;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onLogoutClick: () => void;
  onWriteClick: () => void;
  onMyDiaryClick: () => void;
}) {
  const [diaries, setDiaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchMyDiaries()
      .then(res => setDiaries(res.data))
      .catch(() => setError('내 일기 목록 조회 실패'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa' }}>
      <Header
        nickname={nickname}
        onLoginClick={onLoginClick}
        onSignUpClick={onSignUpClick}
        onLogoutClick={onLogoutClick}
        onWriteClick={onWriteClick}
        onMyDiaryClick={onMyDiaryClick}
      />
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', minHeight: 'calc(100vh - 80px)', background: '#f7f8fa', padding: '0 0 60px 0' }}>
        {/* 마이페이지 타이틀 & 프로필 */}
        <section style={{ width: 600, margin: '40px auto 0 auto', background: '#fff6f6', borderRadius: 18, padding: '36px 36px 24px 36px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
          <h1 style={{ color: '#f7c9c9', fontWeight: 800, fontSize: 32, margin: 0, letterSpacing: -1 }}>마이페이지</h1>
          <div style={{ color: '#f7c9c9', fontWeight: 600, fontSize: 20, marginTop: 8 }}>{nickname ? `${nickname} 님` : ''}</div>
          <div style={{ color: '#888', fontSize: 15, marginTop: 2 }}>총 <span style={{ color: '#f7c9c9', fontWeight: 700 }}>{diaries.length}</span>개의 일기가 있습니다.</div>
          <div style={{ color: '#aaa', fontSize: 14, marginTop: 8 }}>Feelink와 함께 감정을 기록해보세요!</div>
        </section>
        {/* 일기 카드 목록 */}
        <section style={{ width: 600, margin: '32px auto 0 auto' }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#f7c9c9', marginBottom: 18, marginLeft: 2 }}>내가 쓴 일기</div>
          {loading ? (
            <div style={{ textAlign: 'center', marginTop: 40 }}>로딩 중...</div>
          ) : error ? (
            <div style={{ color: '#f7c9c9', textAlign: 'center', marginTop: 40 }}>{error}</div>
          ) : !diaries.length ? (
            <div style={{ textAlign: 'center', marginTop: 40, color: '#888' }}>작성한 일기가 없습니다.</div>
          ) : (
            diaries.map(diary => (
              <DiaryCard key={diary.id} diary={diary} isOwner={true} onClick={() => navigate(`/diary/${diary.id}`)} />
            ))
          )}
        </section>
      </main>
    </div>
  );
} 