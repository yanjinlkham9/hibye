import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser } from "../../store/types";
import { useDispatch } from "react-redux";
import * as S from "../../styles/mixin";
import * as M from "../../styles/ModifyUserStyle";

const API = process.env.REACT_APP_API_SERVER;

export default function ModifyUser() {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [skinType, setSkinType] = useState("DRY");
  const [isNickChecked, setIsNickChecked] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [isValidNickname, setIsValidNickname] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [originalNickname, setOriginalNickname] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(`${API}/user/check-login`, {
          withCredentials: true,
        });

        const user = res.data;
        setId(user.id);
        setNickname(user.nickname || "");
        setOriginalNickname(user.nickname || "");
        setSkinType(user.skintype || "DRY");
        if (user.profile_pic) {
          setPreviewImage(user.profile_pic); // S3 이미지 URL
        }
      } catch (err) {
        console.error("유저 정보 불러오기 실패", err);
      }
    };

    fetchUserInfo();
  }, []);

  const handleNickCheck = async () => {
    if (!nickname) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`${API}/user/checkNick/${nickname}`, {
        withCredentials: true,
      });
      console.log(response.data);
      if (response.data.available) {
        setIsNickChecked(true);
      } else {
        setIsNickChecked(false);

        setErrorMessage("이미 사용 중인 닉네임입니다.");
      }
    } catch (error) {
      console.error("nick check error:", error);
      setErrorMessage("닉에임 중복 확인 중 오류가 발생했습니다.");
      setIsNickChecked(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsNickChecked(false);
  }, [nickname]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (nickname !== originalNickname && !isNickChecked) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }

    if (nickname && isNickChecked) formData.append("nickname", nickname);
    if (password && password === confirmPassword && isValidPassword)
      formData.append("password", password);
    if (skinType) formData.append("skinType", skinType);
    if (profileImage) formData.append("profileImage", profileImage);

    if ([...formData.keys()].length === 0) {
      setErrorMessage("변경된 정보가 없습니다.");
      return;
    }

    try {
      const response = await axios.put(`${API}/user/changeInfo`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("회원정보 수정 완료", response.data);
      alert("회원정보 수정이 완료되었습니다.");
      dispatch(
        loginUser({
          id,
          nickname,
          skintype: skinType,
          profile_pic: previewImage,
        })
      );

      navigate("/posts/all");
    } catch (error) {
      console.error("회원정보 수정 에러", error);
      setErrorMessage("회원정보 수정 중 문제가 발생했습니다.");
    }
  };
  const handleDelete = async () => {
    if (!window.confirm("정말 탈퇴하시겠습니까? 😢")) return;

    try {
      await axios.delete(`${API}/user/deleteUser`, {
        withCredentials: true,
      });
      alert("회원 탈퇴가 완료되었습니다.");
      dispatch(logoutUser());
      navigate("/user/login");
    } catch (err) {
      console.error("회원 탈퇴 실패", err);
      alert("탈퇴 중 문제가 발생했습니다.");
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
  return (
    <S.MainLayout>
      <M.PageWrapper>
        <M.SectionTitle>회원정보 수정</M.SectionTitle>
        <M.ProfileImageContainer>
          <img src={previewImage || ""} alt="프로필 이미지" />
        </M.ProfileImageContainer>
        <M.Label htmlFor="profilePic">프로필 이미지: </M.Label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e)}
        />
        <M.Form>
          <M.Label>아이디: </M.Label>
          <M.Input value={id} disabled readOnly></M.Input>

          <M.Label>닉네임: </M.Label>
          <M.NickInputWrapper>
            <M.Input
              type="text"
              id="nickname"
              placeholder="{nickname}"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <M.CheckButton
              type="button"
              onClick={handleNickCheck}
              disabled={!nickname || isNickChecked || isLoading}
            >
              {isLoading ? "확인 중..." : "중복 확인"}
            </M.CheckButton>
          </M.NickInputWrapper>
          {isValidNickname === false && (
            <span style={{ color: "red" }}>
              닉네임은 3~10자, 영문/숫자/한글만 가능합니다.
            </span>
          )}
          {isNickChecked && (
            <span style={{ color: "green" }}>✓ 사용 가능한 닉네임입니다</span>
          )}

          <M.Label htmlFor="password"> 새 비밀번호: </M.Label>
          <M.Input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isValidPassword === false && (
            <span style={{ color: "red" }}>
              비밀번호는 6~20자, 영문, 숫자, 특수문자를 포함해야 합니다.
            </span>
          )}

          <M.Label htmlFor="confirm-password">새 비밀번호 확인: </M.Label>
          <M.Input
            type="password"
            id="confirm-password"
            placeholder="비밀번호를 다시 입력하세요."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {password !== confirmPassword && confirmPassword.length > 0 && (
            <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다</p>
          )}

          <M.Label htmlFor="skintype">피부 타입: </M.Label>
          <M.Select
            id="skinType"
            value={skinType}
            onChange={(e) => setSkinType(e.target.value)}
          >
            <option value="DRY">건조</option>
            <option value="OILY">지성</option>
            <option value="SENSITIVE">민감성</option>
            <option value="COMBINATION">복합성</option>
          </M.Select>
        </M.Form>
        <M.ButtonRow>
          <M.CheckButton type="submit" onClick={handleSubmit}>
            회원정보 수정하기
          </M.CheckButton>
          <M.DangerButton type="button" onClick={handleDelete}>
            회원탈퇴
          </M.DangerButton>
        </M.ButtonRow>
      </M.PageWrapper>
    </S.MainLayout>
  );
}
