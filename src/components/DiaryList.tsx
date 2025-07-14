import { useEffect, useState } from 'react';
import { fetchAllDiaries } from '../api/diary';
import DiaryCard from './DiaryCard';

export default function DiaryList() {
  const [diaries, setDiaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchAllDiaries()
      .then(res => setDiaries(res.data))
      .catch(() => setError('일기 목록 조회 실패'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: 40 }}>로딩 중...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>{error}</div>;
  if (!diaries.length) return <div style={{ textAlign: 'center', marginTop: 40, color: '#888' }}>작성된 일기가 없습니다.</div>;

  return (
    <div style={{ width: 600, margin: '0 auto' }}>
      {diaries.map(diary => (
        <DiaryCard key={diary.id} diary={diary} />
      ))}
    </div>
  );
} 