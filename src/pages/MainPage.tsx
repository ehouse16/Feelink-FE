import Header from '../components/Header';


const MainPage = ({ nickname, onLoginClick, onSignUpClick, onLogoutClick }: {
  nickname: string | null;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onLogoutClick: () => void;
}) => {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa' }}>
      <Header
        nickname={nickname}
        onLoginClick={onLoginClick}
        onSignUpClick={onSignUpClick}
        onLogoutClick={onLogoutClick}
      />
    </div>
  );
};

export default MainPage;
