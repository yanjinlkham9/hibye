import { Link } from "react-router-dom";
import * as S from "../../styles/mixin";
import styled from "styled-components";

export default function Category() {
  return (
    <>
      <S.MainLayout>
        <CategoryWrapper>
          <CategoryLink to="/posts/category/skincare">스킨케어</CategoryLink>
          <CategoryLink to="/posts/category/makeup">색조</CategoryLink>
          <CategoryLink to="/posts/category/tools">도구</CategoryLink>
          <CategoryLink to="/posts/category/bodycare">헤어&바디</CategoryLink>
          <CategoryLink to="/posts/category/etc">기타</CategoryLink>
        </CategoryWrapper>
      </S.MainLayout>
    </>
  );
}
const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 40px 20px;
  background-color: #fdfdfd;
`;

const CategoryLink = styled(Link)`
  display: inline-block;
  padding: 12px 20px;
  border-radius: 30px;
  background: #f3f5fa;
  color: #333;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: all 0.25s ease;

  &:hover {
    background: #dbe8ff;
    color: #1a73e8;
    transform: translateY(-2px);
  }
`;
