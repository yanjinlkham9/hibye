import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "../styles/mixin";
import * as R from "../styles/RegisterStyle";

const API = process.env.REACT_APP_API_SERVER;
const S3 = process.env.REACT_APP_S3;

export default function Register() {
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [skinType, setSkinType] = useState("DRY");
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isNickChecked, setIsNickChecked] = useState(false);
  const [isValidUserId, setIsValidUserId] = useState(null);
  const [isValidNickname, setIsValidNickname] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageNick, setErrorMessageNick] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleIdCheck = async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`${API}/user/check/${userId}`, {
        withCredentials: true,
      });
      console.log(response.data);
      if (response.data.available) {
        setIsIdChecked(true);
        setErrorMessage("");
      } else {
        setIsIdChecked(false);
        setErrorMessage("이미 사용 중인 아이디입니다.");
      }
    } catch (error) {
      console.error("ID check error:", error);
      setErrorMessage("아이디 중복 확인 중 오류가 발생했습니다.");
      setIsIdChecked(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleNickCheck = async () => {
    if (!nickname) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`${API}/user/checkNick/${nickname}`, {
        withCredentials: true, // 쿠키를 포함시켜 요청
      });
      console.log(response.data);
      if (response.data.available) {
        setIsNickChecked(true);
        setErrorMessageNick("");
      } else {
        setIsNickChecked(false);
        setErrorMessageNick("이미 사용 중인 닉네임입니다.");
      }
    } catch (error) {
      console.error("nick check error:", error);
      setErrorMessageNick("닉에임 중복 확인 중 오류가 발생했습니다.");
      setIsNickChecked(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!isIdChecked) {
      setErrorMessage("아이디 중복 확인이 필요합니다.");
      return;
    }

    if (!isValidNickname || !isValidPassword) {
      setErrorMessage("모든 필드가 유효한지 확인해주세요.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const userDTO = {
        id: userId,
        nickname: nickname,
        password: password,
        skintype: skinType,
        profile_pic: `${S3}/profile/profile.jpg`,
      };

      const response = await axios.post(`${API}/user/register`, userDTO, {
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 201) {
        alert("회원가입이 완료되었습니다!");
        navigate("/user/login");
      }
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response) {
        setErrorMessage(
          error.response.data.message || "회원가입 중 오류가 발생했습니다."
        );
      } else {
        setErrorMessage(
          "서버 연결에 문제가 있습니다. 나중에 다시 시도해주세요."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const nicknameRegex = /^[a-zA-Z0-9가-힣]{3,10}$/;
    setIsValidNickname(nickname !== "" ? nicknameRegex.test(nickname) : null);
  }, [nickname]);

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$]).{6,20}$/;
    setIsValidPassword(password !== "" ? passwordRegex.test(password) : null);
  }, [password]);

  useEffect(() => {
    const userIdRegex = /^[a-z0-9]{3,10}$/;
    setIsValidUserId(userId !== "" ? userIdRegex.test(userId) : null);
  }, [userId]);

  return (
    <S.MainLayout>
      <R.RegisterContainer>
        <R.Title>회원가입</R.Title>
        <form onSubmit={handleSubmit}>
          <R.FormGroup>
            <label htmlFor="userId">아이디</label>
            <R.InlineInputGroup>
              <R.TextInput
                type="text"
                id="userId"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                  setIsIdChecked(false);
                  setErrorMessage();
                }}
                disabled={isIdChecked}
              />
              <R.CheckButton
                type="button"
                onClick={handleIdCheck}
                disabled={!userId || isIdChecked || isLoading}
              >
                {isLoading ? "확인 중..." : "중복 확인"}
              </R.CheckButton>
            </R.InlineInputGroup>
            {isValidUserId === false && (
              <R.Error>아이디는은 3~10자, 영문/숫자/ 가능합니다.</R.Error>
            )}
            {isValidUserId && isIdChecked && (
              <R.Success>✓ 사용 가능한 아이디입니다</R.Success>
            )}
            {!isIdChecked && errorMessage && (
              <R.Error>이미 사용 중인 아이디입니다</R.Error>
            )}
          </R.FormGroup>

          {/* 닉네임 */}
          <R.FormGroup>
            <label htmlFor="nickname">닉네임</label>
            <R.InlineInputGroup>
              <R.TextInput
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  setIsNickChecked(false);
                  setErrorMessageNick();
                }}
              />
              <R.CheckButton
                type="button"
                onClick={handleNickCheck}
                disabled={!nickname || isNickChecked || isLoading}
              >
                {isLoading ? "확인 중..." : "중복 확인"}
              </R.CheckButton>
            </R.InlineInputGroup>

            {isValidNickname === false && (
              <R.Error>닉네임은 3~10자, 영문/숫자/한글만 가능합니다.</R.Error>
            )}
            {isNickChecked && <R.Success>✓ 사용 가능한 닉네임입니다</R.Success>}
            {isNickChecked === false && errorMessageNick && (
              <R.Error>이미 사용 중인 닉네임입니다</R.Error>
            )}
          </R.FormGroup>

          {/* 비밀번호 */}
          <R.FormGroup>
            <label htmlFor="password">비밀번호</label>
            <R.InlineInputGroup>
              <R.TextInput
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </R.InlineInputGroup>
            {isValidPassword === false && (
              <R.Error>
                비밀번호는 6~20자, 영문, 숫자, 특수문자를 포함해야 합니다.
              </R.Error>
            )}
          </R.FormGroup>

          {/* 비밀번호 확인 */}
          <R.FormGroup>
            <label htmlFor="passwordCheck">비밀번호 확인</label>
            <R.InlineInputGroup>
              <R.TextInput
                type="password"
                id="passwordCheck"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
              />
            </R.InlineInputGroup>
            {password !== passwordCheck && passwordCheck.length > 0 && (
              <R.Error>비밀번호가 일치하지 않습니다</R.Error>
            )}
          </R.FormGroup>

          {/* 피부 타입 */}
          <R.FormGroup>
            <label htmlFor="skinType">피부 타입</label>
            <R.Select
              id="skinType"
              value={skinType}
              onChange={(e) => setSkinType(e.target.value)}
            >
              <option value="DRY">건조</option>
              <option value="OILY">지성</option>
              <option value="SENSITIVE">민감성</option>
              <option value="COMBINATION">복합성</option>
            </R.Select>
          </R.FormGroup>

          {/* 버튼 */}
          <R.SubmitButton
            type="submit"
            disabled={
              !(isValidNickname && isValidPassword && isIdChecked) || isLoading
            }
          >
            {isLoading ? "처리 중..." : "회원가입"}
          </R.SubmitButton>

          {/* 로그인 링크 */}
          <R.LinkBox>
            이미 회원이신가요?
            <Link to="/user/login">로그인</Link>
          </R.LinkBox>
        </form>
      </R.RegisterContainer>
    </S.MainLayout>
  );
}
