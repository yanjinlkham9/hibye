import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";
const GlobalStyle = createGlobalStyle`
  ${normalize}
  @import url('https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap');
  body {
    margin: 0;
    font-family: 'Gowun Dodum', sans-serif;
    background-color: #fff;
  }

  * {
    box-sizing: border-box;
  }

  /* ------------ variables ------------ */

  /* :root {
      --color-primary: #c36975 ;
      --color-primary-dark:#c36975;
      --color-primary-light:rgb(255, 219, 235);

      --color-text: var(--color-black);
      --color-text-accent: var(--color-purpleblue);
      --color-text-white: var(--color-white);

      
      --color-black: #232629;
      --color-gray: #979797;
      --color-lightgray: #bfbfbf;
      --color-white: #ffffff;
      --color-purpleblue: #c36975;
  } */
  
  /* ------------ 페이지 ------------ */

  /* ------------ CSS reset ------------ */
  /* 기본 설정 */
  html {
    min-height: 100vh; 
    font-size: 16px;
    box-sizing: border-box;
    scroll-behavior: smooth; 
    -webkit-text-size-adjust: 100%; /* iOS에서 텍스트 크기 자동 조정 방지 */
    text-rendering: optimizeLegibility; /* 폰트 가독성 향상 */
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  /* 반응형 이미지 & 미디어 요소 최적화 */
  img, video, canvas, svg {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* 리스트 스타일 초기화 */
  ul, ol {
    /* list-style: none; */
    padding: 0;
    margin: 0;
  }

  /* 링크 기본 스타일 */
  a {
    /* text-decoration: none; */
    color: inherit;
  }

  /* 버튼 & 폼 요소 초기화 */
  button, input, textarea, select {
    font: inherit;
    /* background: none; */
    /* border: none;
    outline: none; */
  }

  button {
    cursor: pointer;
  }

  textarea {
    resize: vertical;
  }

  /* 테이블 스타일 초기화 */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* 반응형 타이포그래피 */
  body {
    font-family: "Gowun Dodum", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #333;
    background-color: #fff;
  }
`;

export default GlobalStyle;
