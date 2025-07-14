import Header from '../components/Header';
import DiaryList from '../components/DiaryList';

const MainPage = ({ nickname, onLoginClick, onSignUpClick, onLogoutClick, onWriteClick, onMyDiaryClick }: {
  nickname: string | null;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onLogoutClick: () => void;
  onWriteClick: () => void;
  onMyDiaryClick: () => void;
}) => {
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
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '32px 0 0 0', boxSizing: 'border-box', gap: 24 }}>
        <DiaryList />
      </main>
    </div>
  );
};

export default MainPage;
