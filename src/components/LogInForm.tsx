import { useState } from 'react';
import { logIn } from '../api/member';

export default function LogInForm({ onSuccess }: { onSuccess: (nickname: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await logIn({ email, password });
      onSuccess(res.data.nickname);
    } catch (err) {
      setError('로그인 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 300 }}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일" style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #f7c9c9', outlineColor: '#f7c9c9', background: '#fff', color: '#222', fontSize: 15 }} />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="비밀번호" style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #f7c9c9', outlineColor: '#f7c9c9', background: '#fff', color: '#222', fontSize: 15 }} />
      <button type="submit" style={{ background: '#f7c9c9', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 0', fontWeight: 600, fontSize: 16 }}>로그인</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
} 