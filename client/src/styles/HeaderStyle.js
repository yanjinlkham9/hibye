// styles/StyledHeader.js
import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  width: 100%;
  font-family: "Gowun Dodum", sans-serif;
  background-color: #c36975;
`;

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin: 0px 160px;
  background-color: #c36975;
  font-family: "Gowun Dodum", sans-serif;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    margin: 0;
  }
`;

export const Logo = styled(Link)`
  font-size: 1.8rem;
  text-decoration: none;
  font-weight: 700;
  color: #fff;
`;

export const CenterNav = styled.nav`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: center;

  @media (max-width: 767px) {
    display: ${({ open }) => (open ? "block" : "none")};
    width: 100%;
    margin-top: 10px;
  }
`;

export const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const NavItem = styled.li`
  margin-right: 20px;

  @media (max-width: 767px) {
    margin: 10px 0;
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: bold;

  &:hover {
    color: #d5979f;
  }
`;

export const AuthLinks = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 767px) {
    margin-top: 10px;
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

export const AuthLink = styled(Link)`
  text-decoration: none;
  color: #fff;

  &:hover {
    color: #d5979f;
  }
`;

export const MenuIcon = styled.i`
  display: none;
  font-size: 26px;
  color: white;
  cursor: pointer;

  @media (max-width: 767px) {
    display: block;
    margin-left: auto;
  }
`;
export const MobileAuthLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;

  a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: #d5979f;
    }
  }

  @media (min-width: 768px) {
    display: none; /* 데스크탑에서는 안 보이게 */
  }
`;
export const MobileHeaderRow = styled.div`
  width: 100%;
  display: none;

  @media (max-width: 767px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;
