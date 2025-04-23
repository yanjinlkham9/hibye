import React from "react";
import Post from "../components/common/PostList";
import * as S from "../styles/mixin";

export default function Home() {
  return (
    <S.MainLayout>
      <h1>전체 글</h1>
      <Post />
    </S.MainLayout>
  );
}
