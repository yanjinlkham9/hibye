import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import * as M from "../../styles/mixin";
import Postc from "../../components/common/PostCard.jsx";
import * as S from "../../styles/PostStyles.ts";

const API = process.env.REACT_APP_API_SERVER;

export default function CategoryPosts() {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/posts/category/${category}?page=${page}&size=10`,
          { withCredentials: true }
        );
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error("불러오기 실패", err);
      }
    };

    fetchData();
  });

  return (
    <M.MainLayout>
      <h2>카테고리: {category}</h2>
      {posts.length === 0 ? <p>게시글이 없습니다.</p> : <Postc posts={posts} />}
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
