import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/types";
import styled from "styled-components";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_SERVER;
const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${API}/user/logout`, null, {
        withCredentials: true,
      });
      dispatch(logoutUser());
      navigate("/posts/all");
    } catch (err) {
      console.error("로그아웃 실패", err);
      alert("로그아웃 중 오류 발생");
    }
  };

  return (
    <Button onClick={handleLogout}>
      <FiLogOut />
      <span>로그아웃</span>
    </Button>
  );
};

export default LogoutButton;
const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #f3dde069; /* 버튼 배경색 */
  color: white;
  border: none;
  border-radius: 30px;
  /* padding: 10px 18px; */
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #f5d9dd9a;
  }

  svg {
    font-size: 20px;
  }
`;
