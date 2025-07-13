import { useState } from 'react';
import { createDiary } from '../api/diary';

function formatDate(dateString: string) {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

export default function DiaryWriteForm({ onSuccess }: { onSuccess?: (diaryId: number) => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emotion, setEmotion] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmotion(null);
    setCreatedAt(null);
    setLoading(true);
    try {
      const res = await createDiary({ title, content });
      setEmotion(res.data.emotionType);
      setCreatedAt(res.data.createdAt || null);
      setTitle('');
      setContent('');
      if (onSuccess && res.data && res.data.id) onSuccess(res.data.id);
    } catch (err) {
      setError('일기 등록 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400, background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h2 style={{ color: '#f7c9c9', textAlign: 'center', marginBottom: 8 }}>일기 쓰기</h2>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="제목"
        style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #f7c9c9', background: '#fff', color: '#222', fontSize: 15 }}
        minLength={2}
        maxLength={30}
        required
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="내용 (10~1000자)"
        style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #f7c9c9', background: '#fff', color: '#222', fontSize: 15, minHeight: 120, resize: 'vertical' }}
        minLength={10}
        maxLength={1000}
        required
      />
      <button type="submit" style={{ background: '#f7c9c9', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 600, fontSize: 16 }} disabled={loading}>
        {loading ? '등록 중...' : '등록하기'}
      </button>
      {emotion && <div style={{ color: '#f7c9c9', textAlign: 'center', fontWeight: 600 }}>감정 분석 결과: {emotion}</div>}
      {createdAt && <div style={{ color: '#888', textAlign: 'center', fontWeight: 500 }}>작성일: {formatDate(createdAt)}</div>}
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
    </form>
  );
} 