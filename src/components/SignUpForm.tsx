import { useState } from 'react';
import { signUp, checkEmail, checkNickname } from '../api/member';

export default function SignUpForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const [nickname, setNickname] = useState('');
  const [nicknameValid, setNicknameValid] = useState<boolean | null>(null);
  const [checkingNickname, setCheckingNickname] = useState(false);

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // 이메일 중복확인 버튼 클릭
  const handleCheckEmail = async () => {
    setCheckingEmail(true);
    setEmailValid(null);
    try {
      const valid = await checkEmail(email);
      setEmailValid(valid);
    } catch {
      setEmailValid(false);
    } finally {
      setCheckingEmail(false);
    }
  };

  // 닉네임 중복확인 버튼 클릭
  const handleCheckNickname = async () => {
    setCheckingNickname(true);
    setNicknameValid(null);
    try {
      const valid = await checkNickname(nickname);
      setNicknameValid(valid);
    } catch {
      setNicknameValid(false);
    } finally {
      setCheckingNickname(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signUp({ email, password, nickname });
      onSuccess();
    } catch (err) {
      setError('회원가입 실패');
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit =
    emailValid && nicknameValid && password.length >= 6 && password.length <= 12 && !submitting;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 300 }}>
      <div style={{ display: 'flex', gap: 8, width: '100%' }}>
        <input
          value={email}
          onChange={e => { setEmail(e.target.value); setEmailValid(null); }}
          placeholder="이메일"
          style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #f7c9c9', outlineColor: '#f7c9c9', background: '#fff', color: '#222', fontSize: 15 }}
        />
        <button type="button" onClick={handleCheckEmail} style={{ background: '#f7c9c9', color: '#fff', border: 'none', borderRadius: 8, padding: '0 12px', fontWeight: 500, minWidth: 70 }} disabled={checkingEmail || !email}>
          {checkingEmail ? '확인중' : '중복확인'}
        </button>
      </div>
      {emailValid === true && <div style={{ color: 'green', fontSize: 13 }}>사용 가능한 이메일입니다.</div>}
      {emailValid === false && <div style={{ color: 'red', fontSize: 13 }}>이미 사용 중인 이메일입니다.</div>}
      <div style={{ display: 'flex', gap: 8, width: '100%' }}>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="비밀번호"
          style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #f7c9c9', outlineColor: '#f7c9c9', background: '#fff', color: '#222', fontSize: 15 }}
        />
        {/* 버튼 대신 빈 공간 맞추기 */}
        <div style={{ minWidth: 80 }} />
      </div>
      <div style={{ display: 'flex', gap: 8, width: '100%' }}>
        <input
          value={nickname}
          onChange={e => { setNickname(e.target.value); setNicknameValid(null); }}
          placeholder="닉네임"
          style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #f7c9c9', outlineColor: '#f7c9c9', background: '#fff', color: '#222', fontSize: 15 }}
        />
        <button type="button" onClick={handleCheckNickname} style={{ background: '#f7c9c9', color: '#fff', border: 'none', borderRadius: 8, padding: '0 12px', fontWeight: 500, minWidth: 70 }} disabled={checkingNickname || !nickname}>
          {checkingNickname ? '확인중' : '중복확인'}
        </button>
      </div>
      {nicknameValid === true && <div style={{ color: 'green', fontSize: 13 }}>사용 가능한 닉네임입니다.</div>}
      {nicknameValid === false && <div style={{ color: 'red', fontSize: 13 }}>이미 사용 중인 닉네임입니다.</div>}
      <button
        type="submit"
        style={{
          background: '#f7c9c9',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 0',
          fontWeight: 600,
          fontSize: 16,
          opacity: canSubmit ? 1 : 0.5,
          cursor: canSubmit ? 'pointer' : 'not-allowed',
        }}
        disabled={!canSubmit}
      >
        회원가입
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
} 