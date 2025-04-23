import styled from "styled-components";
import ModifyUser from "./ModifyUser";
import { useSelector } from "react-redux";
import MyPosts from "./MyPosts";
import { useState } from "react";
import * as S from "../../styles/mixin";
export default function Tab() {
  const [activeTab, setActiveTab] = useState("edit");
  const userId = useSelector((state) => state.isLogin.user?.id);

  return (
    <S.MainLayout>
      <TabWrapper>
        <TabButton
          active={activeTab === "edit"}
          onClick={() => setActiveTab("edit")}
        >
          회원정보 수정
        </TabButton>
        <TabButton
          active={activeTab === "posts"}
          onClick={() => setActiveTab("posts")}
        >
          내가 쓴 글
        </TabButton>
      </TabWrapper>
      {activeTab === "edit" ? <ModifyUser /> : <MyPosts userId={userId} />}
    </S.MainLayout>
  );
}
const TabWrapper = styled.div`
  display: flex;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 12px;
  background-color: ${({ active }) => (active ? "#571923" : "#eee")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  font-weight: bold;
  border: none;
  border-radius: 8px 8px 0 0;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? "#c36975" : "#ddd")};
  }
`;
