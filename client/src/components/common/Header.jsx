import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import LogoutButton from "./LogoutBtn";
import AuthCheck from "./AuthCheck";
import {
  HeaderContainer,
  StyledHeader,
  Logo,
  CenterNav,
  NavList,
  NavItem,
  NavLink,
  AuthLinks,
  AuthLink,
  MenuIcon,
  MobileAuthLinks,
  MobileHeaderRow,
} from "../../styles/HeaderStyle";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.isLogin.isLoggedIn);
  const user = useSelector((state) => state.isLogin.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <HeaderContainer>
      <StyledHeader>
        <AuthCheck />

        {/* ✅ 데스크탑 로고 */}
        {!isMobile && (
          <h1>
            <Logo to="/posts/all">하이바이</Logo>
          </h1>
        )}

        {/* ✅ 모바일 로고 + 메뉴 아이콘 한 줄 */}
        {isMobile && (
          <MobileHeaderRow>
            <Logo to="/posts/all">하이바이</Logo>
            <MenuIcon className="bi bi-list" onClick={toggleMenu} />
          </MobileHeaderRow>
        )}

        <CenterNav open={isMenuOpen}>
          <NavList>
            <NavItem>
              <NavLink to="/posts/all" onClick={closeMenu}>
                홈
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/posts/category" onClick={closeMenu}>
                카테고리
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/posts/addPost" onClick={closeMenu}>
                글 등록
              </NavLink>
            </NavItem>

            {/* ✅ 모바일일 때 인증 링크도 메뉴 안에 포함 */}
            {isMobile && (
              <MobileAuthLinks>
                {isLoggedIn ? (
                  <>
                    <NavLink to="/posts/my" onClick={closeMenu}>
                      {user?.nickname}님!
                    </NavLink>
                    <LogoutButton />
                  </>
                ) : (
                  <>
                    <NavLink to="/user/login" onClick={closeMenu}>
                      로그인
                    </NavLink>
                    <NavLink to="/user/register" onClick={closeMenu}>
                      회원가입
                    </NavLink>
                  </>
                )}
              </MobileAuthLinks>
            )}
          </NavList>
        </CenterNav>

        {/* ✅ 데스크탑일 때만 인증 링크 오른쪽에 표시 */}
        {!isMobile && (
          <AuthLinks>
            {isLoggedIn ? (
              <>
                <AuthLink to="/posts/my">👤{user?.nickname}님!</AuthLink>
                <LogoutButton />
              </>
            ) : (
              <>
                <AuthLink to="/user/login">로그인</AuthLink>
                <AuthLink to="/user/register">회원가입</AuthLink>
              </>
            )}
          </AuthLinks>
        )}
      </StyledHeader>
    </HeaderContainer>
  );
}
