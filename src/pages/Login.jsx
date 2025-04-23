import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../store/types";
import * as S from "../styles/mixin";
import * as L from "../styles/LoginStyle";
const API = process.env.REACT_APP_API_SERVER;

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API}/user/login`,
        {
          id: userId,
          password: password,
        },
        {
          withCredentials: true, // JWT가 쿠키로 저장됨
        }
      );

      if (response.status === 200) {
        const userInfo = response.data;
        dispatch(loginUser(userInfo));
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <S.MainLayout>
      <L.LoginContainer>
        <L.Title>로그인</L.Title>
        <form onSubmit={handleLogin}>
          <L.InputGroup>
            <label htmlFor="userId">아이디</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </L.InputGroup>
          <L.InputGroup>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </L.InputGroup>

          <L.SubmitButton type="submit">로그인</L.SubmitButton>
        </form>

        {errorMessage && <L.ErrorMessage>{errorMessage}</L.ErrorMessage>}

        <L.SignupLink>
          아직 회원이 아니신가요?
          <Link to="/user/register">회원가입</Link>
        </L.SignupLink>
      </L.LoginContainer>
    </S.MainLayout>
  );
}
