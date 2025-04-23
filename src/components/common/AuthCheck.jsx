import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { loginUser, logoutUser } from "../../store/types";
const API = process.env.REACT_APP_API_SERVER;

const AuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(`${API}/user/check-login`, {
          withCredentials: true,
        });
        dispatch(loginUser(res.data)); // 유저 정보 저장
      } catch (err) {
        dispatch(logoutUser()); // 로그인 실패 시 초기화
      }
    };
    checkLogin();
  }, [dispatch]);

  return null;
};

export default AuthCheck;
