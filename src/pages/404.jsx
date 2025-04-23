import React from "react";
import { Link } from "react-router-dom";
import * as S from "../styles/mixin";

const NotFoundPage = () => {
  return (
    <S.MainLayout>
      <h1 style={{ textAlign: "center" }}>404</h1>
      <p style={{ textAlign: "center" }}>
        Oops! 페이지 없습니다..
        <br />
        <br />
        <Link
          to="/"
          style={{ textDecoration: "none", color: "blue", textAlign: "center" }}
        >
          홈으로 이동
        </Link>
      </p>
    </S.MainLayout>
  );
};

export default NotFoundPage;
