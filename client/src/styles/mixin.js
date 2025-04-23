// 재사용 가능한 스타일 모음

import { styled } from "styled-components";

// 전체 페이지 스타일 (헤더 제외)
export const MainLayout = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap");
  font-family: "Gowun Dodum", sans-serif;
  width: 100%;
  max-width: 1024px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px;
`;

export const FlexLayout = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 버튼 (L)44px - 주로 모바일 (M) (S)24
export const BtnSmall = styled.button`
  height: 24px;
  width: 24px;
`;
