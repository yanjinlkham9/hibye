import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as S from "../../styles/PostStyles.ts";
import * as M from "../../styles/mixin";
import Postc from "../../components/common/PostList.jsx";
const API = process.env.REACT_APP_API_SERVER;

export default function MyPosts() {
  const [myPosts, setMyPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const userId = useSelector((state) => state.isLogin.user?.id);
  useEffect(() => {
    if (!userId) return;

    const fetchMyPosts = async () => {
      try {
        const res = await axios.get(
          `${API}/posts/user/${userId}?page=${page}&size=10`,
          {
            withCredentials: true,
          }
        );
        setMyPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
        console.log("내 게시글 응답:", res.data);
      } catch (err) {
        console.error("내 게시글 불러오기 실패:", err);
      }
    };

    fetchMyPosts();
  }, [userId, page]);
  return (
    <M.MainLayout>
      <h2>내가 쓴 글</h2>
      <Postc posts={myPosts} />
      <S.PaginationWrapper>
        {Array.from({ length: totalPages }, (_, idx) => (
          <S.PageButton
            key={idx + 1}
            onClick={() => setPage(idx + 1)}
            active={page === idx + 1}
          >
            {idx + 1}
          </S.PageButton>
        ))}
      </S.PaginationWrapper>
    </M.MainLayout>
  );
}
