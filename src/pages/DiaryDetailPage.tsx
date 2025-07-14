import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { updateMyDiary, deleteMyDiary } from '../api/diary';

const emotionBgColor: Record<string, string> = {
  JOY: '#FFF3B0', 행복: '#FFF3B0',
  SADNESS: '#B0D0FF', 슬픔: '#B0D0FF',
  ANGER: '#FFB0B0', 분노: '#FFB0B0',
  ANXIETY: '#FFD6B0', 불안: '#FFD6B0',
  SURPRISE: '#D6FFB0', 놀람: '#D6FFB0',
  DISGUST: '#B0FFC2', 혐오: '#B0FFC2',
  NEUTRAL: '#E0E0E0', 무감정: '#E0E0E0',
};

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

export default function DiaryDetailPage({ nickname, onLoginClick, onSignUpClick, onLogoutClick, onWriteClick, onMyDiaryClick }: {
  nickname: string | null;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onLogoutClick: () => void;
  onWriteClick: () => void;
  onMyDiaryClick: () => void;
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchDiary(id)
      .then(res => setDiary(res.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, showEdit]);

  const isOwner = nickname && diary && nickname === diary.nickName;

  const handleEdit = () => {
    if (!isOwner) {
      alert('작성자만 수정할 수 있습니다.');
      return;
    }
    setEditTitle(diary.title);
    setEditContent(diary.content);
    setShowEdit(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwner) {
      alert('작성자만 수정할 수 있습니다.');
      return;
    }
    setEditLoading(true);
    try {
      await updateMyDiary(Number(id), { title: editTitle, content: editContent });
      setShowEdit(false);
      // 수정 후 일기 정보 다시 불러오기
      const res = await fetchDiary(id!);
      setDiary(res.data);
    } catch (error: any) {
      alert(error.message || '수정 실패');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!isOwner) {
      alert('작성자만 삭제할 수 있습니다.');
      return;
    }
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    setDeleteLoading(true);
    try {
      await deleteMyDiary(Number(id));
      navigate('/');
    } catch (error: any) {
      alert(error.message || '삭제 실패');
    } finally {
      setDeleteLoading(false);
    }
  };

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
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 80 }}>로딩 중...</div>
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center', marginTop: 80 }}>{error}</div>
      ) : diary ? (
        <div style={{ maxWidth: 600, margin: '60px auto', background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ color: '#f7c9c9', margin: 0 }}>{diary.title}</h2>
            <span style={{ background: emotionBgColor[diary.emotionType] || '#E6F4FF', color: '#222', borderRadius: 8, padding: '4px 16px', fontSize: 15, fontWeight: 600, marginLeft: 16 }}>
              {diary.emotionType}
            </span>
          </div>
          <div style={{ color: '#888', marginBottom: 8 }}>작성자: {diary.nickName}</div>
          <div style={{ color: '#888', marginBottom: 12 }}>작성일: {formatDate(diary.createdAt)}</div>
          <div style={{ color: '#222', fontSize: 17, whiteSpace: 'pre-line', marginBottom: 24 }}>{diary.content}</div>
          {isOwner && (
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={handleEdit} style={{ background: '#f7c9c9', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 500, cursor: 'pointer' }}>수정</button>
              <button onClick={handleDelete} style={{ background: '#f7c9c9', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 500, cursor: 'pointer' }}>{deleteLoading ? '삭제중...' : '삭제'}</button>
            </div>
          )}
          {showEdit && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
              <form onSubmit={handleEditSubmit} style={{ background: '#fff', borderRadius: 16, padding: 32, minWidth: 340, boxShadow: '0 8px 32px rgba(91,79,255,0.10)' }}>
                <h3 style={{ color: '#f7c9c9', marginBottom: 16 }}>일기 수정</h3>
                <input value={editTitle} onChange={e => setEditTitle(e.target.value)} style={{ width: '100%', marginBottom: 12, padding: '10px 12px', borderRadius: 8, border: '1px solid #f7c9c9' }} />
                <textarea value={editContent} onChange={e => setEditContent(e.target.value)} style={{ width: '100%', minHeight: 100, marginBottom: 16, padding: '10px 12px', borderRadius: 8, border: '1px solid #f7c9c9' }} />
                <div style={{ display: 'flex', gap: 10 }}>
                  <button type="submit" style={{ background: '#f7c9c9', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 500 }} disabled={editLoading}>{editLoading ? '저장중...' : '저장'}</button>
                  <button type="button" onClick={() => setShowEdit(false)} style={{ background: '#eee', color: '#888', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 500 }}>취소</button>
                </div>
              </form>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
} 