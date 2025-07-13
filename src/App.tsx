import { useState } from 'react';
import MainPage from './pages/MainPage';
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';
import { logOut } from './api/member';

function App() {
  const [nickname, setNickname] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);

  const handleLogout = async () => {
    await logOut();
    setNickname(null);
    setAlert('성공적으로 로그아웃되었습니다.');
    setTimeout(() => setAlert(null), 2000);
  };

  return (
    <div>
      <MainPage
        nickname={nickname}
        onLoginClick={() => setShowLogin(true)}
        onSignUpClick={() => setShowSignUp(true)}
        onLogoutClick={handleLogout}
      />
      {alert && (
        <div style={{ position: 'fixed', top: 80, right: 40, background: '#222', color: '#fff', padding: '16px 32px', borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.15)', zIndex: 3000, fontWeight: 500, fontSize: 16 }}>
          {alert}
        </div>
      )}
      {showLogin && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ position: 'relative', background: '#fff', borderRadius: 18, padding: '40px 36px 32px 36px', minWidth: 340, boxShadow: '0 8px 32px rgba(91,79,255,0.10)' }}>
            <button onClick={() => setShowLogin(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer' }}>&times;</button>
            <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#f7c9c9', fontWeight: 700 }}>로그인</h2>
            <LogInForm onSuccess={(nick) => { setNickname(nick); setShowLogin(false); }} />
          </div>
        </div>
      )}
      {showSignUp && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ position: 'relative', background: '#fff', borderRadius: 18, padding: '40px 36px 32px 36px', minWidth: 340, boxShadow: '0 8px 32px rgba(91,79,255,0.10)' }}>
            <button onClick={() => setShowSignUp(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer' }}>&times;</button>
            <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#f7c9c9', fontWeight: 700 }}>회원가입</h2>
            <SignUpForm onSuccess={() => { setShowSignUp(false); }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
