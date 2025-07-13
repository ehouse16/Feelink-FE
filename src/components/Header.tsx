type HeaderProps = {
  nickname: string | null;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onLogoutClick: () => void;
};

const Header = ({ nickname, onLoginClick, onSignUpClick, onLogoutClick }: HeaderProps) => {
  return (
    <header style={{ width: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 40px', borderBottom: '1px solid #eee', background: '#fff' }}>
      <div style={{ fontWeight: 700, fontSize: 24, color: '#f7c9c9' }}>Feelink</div>
      <input type="text" placeholder="일기를 검색해보세요..." style={{ width: 350, padding: '8px 16px', borderRadius: 8, border: '1px solid #ddd', background: '#f7f8fa' }} />
      <div style={{ display: 'flex', gap: 12 }}>
        <button style={{ background: '#f7c9c9', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 500 }}>일기 쓰기</button>
        {nickname ? (
          <>
            <button style={{ background: '#f7c9c9', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 500, cursor: 'default' }} disabled>{nickname} 님</button>
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