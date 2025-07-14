import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

type HeaderProps = {
  nickname: string | null;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onLogoutClick: () => void;
  onWriteClick: () => void;
  onMyDiaryClick?: () => void;
};

const Header = ({ nickname, onLoginClick, onSignUpClick, onLogoutClick, onWriteClick, onMyDiaryClick }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  return (
    <header style={{ width: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 40px', borderBottom: '1px solid #eee', background: '#fff', position: 'relative' }}>
      <Link to="/" style={{ fontWeight: 700, fontSize: 24, color: '#f7c9c9', textDecoration: 'none' }}>Feelink</Link>
      <input type="text" placeholder="일기를 검색해보세요..." style={{ width: 350, padding: '8px 16px', borderRadius: 8, border: '1px solid #ddd', background: '#f7f8fa' }} />
      <div style={{ display: 'flex', gap: 12, position: 'relative' }}>
        {nickname && (
          <button
            style={{ background: '#f7c9c9', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 500 }}
            onClick={onWriteClick}
          >
            일기 쓰기
          </button>
        )}
        {nickname ? (
          <>
            <div style={{ position: 'relative' }} ref={menuRef}>
              <button
                style={{ background: '#f7c9c9', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 500, cursor: 'pointer' }}
                onClick={() => setMenuOpen(v => !v)}
              >
                {nickname} 님
              </button>
              {menuOpen && (
                <div style={{ position: 'absolute', top: '110%', right: 0, background: '#fff', border: '1px solid #eee', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', minWidth: 140, zIndex: 100, padding: '8px 0', display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <button style={{ background: 'none', border: 'none', color: '#222', textAlign: 'left', padding: '10px 20px', fontSize: 15, cursor: 'pointer', width: '100%' }}>
                    마이페이지
                  </button>
                  <button style={{ background: 'none', border: 'none', color: '#222', textAlign: 'left', padding: '10px 20px', fontSize: 15, cursor: 'pointer', width: '100%' }} onClick={() => { setMenuOpen(false); onMyDiaryClick && onMyDiaryClick(); }}>
                    내 일기 보기
                  </button>
                </div>
              )}
            </div>
            <button onClick={onLogoutClick} style={{ background: '#f7c9c9', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 500 }}>로그아웃</button>
          </>
        ) : (
          <>
            <button onClick={onLoginClick} style={{ background: '#f7c9c9', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 500 }}>로그인</button>
            <button onClick={onSignUpClick} style={{ background: '#f7c9c9', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 500 }}>회원가입</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header; 