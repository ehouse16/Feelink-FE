import Header from '../components/Header';

const MainPage = ({ nickname, onLoginClick, onSignUpClick, onLogoutClick, onWriteClick }: {
  nickname: string | null;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onLogoutClick: () => void;
  onWriteClick: () => void;
}) => {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa' }}>
      <Header
        nickname={nickname}
        onLoginClick={onLoginClick}
        onSignUpClick={onSignUpClick}
        onLogoutClick={onLogoutClick}
        onWriteClick={onWriteClick}
      />
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '32px 0 0 0', boxSizing: 'border-box', gap: 24 }}>
        {/* 일기쓰기 폼은 모달로 이동 */}
      </main>
    </div>
  );
};

export default MainPage;
