import { Link } from 'react-router-dom';

const emotionBgColor: Record<string, string> = {
  JOY: '#FFF3B0', 행복: '#FFF3B0',
  SADNESS: '#B0D0FF', 슬픔: '#B0D0FF',
  ANGER: '#FFB0B0', 분노: '#FFB0B0',
  ANXIETY: '#FFD6B0', 불안: '#FFD6B0',
  SURPRISE: '#D6FFB0', 놀람: '#D6FFB0',
  DISGUST: '#B0FFC2', 혐오: '#B0FFC2',
  NEUTRAL: '#E0E0E0', 무감정: '#E0E0E0',
};

export default function DiaryCard({ diary }: { diary: any }) {
  const badgeBg = emotionBgColor[diary.emotionType] || '#E6F4FF';
  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)', marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18 }}>
          <span role="img" aria-label="profile">👤</span>
        </div>
        <div>
          <div style={{ fontWeight: 600, color: '#f7c9c9' }}>{diary.nickName}</div>
          <div style={{ fontSize: 13, color: '#f7c9c9' }}>{new Date(diary.createdAt).toLocaleDateString('ko-KR')}</div>
        </div>
        <span style={{ marginLeft: 'auto', background: badgeBg, color: '#222', borderRadius: 8, padding: '4px 12px', fontSize: 13, fontWeight: 600 }}>{diary.emotionType}</span>
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 700, margin: '8px 0', color: '#f7c9c9' }}>{diary.title}</h3>
      <p style={{ color: '#444', marginBottom: 8, fontSize: 15, minHeight: 24 }}>{diary.content.length > 60 ? diary.content.slice(0, 60) + '...' : diary.content}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 15, color: '#888', marginTop: 8 }}>
        <Link to={`/diary/${diary.id}`} style={{ marginLeft: 'auto', color: '#f7c9c9', fontWeight: 500, textDecoration: 'none' }}>더 읽기</Link>
      </div>
    </div>
  );
} 