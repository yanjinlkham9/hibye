import React, { useEffect, useState } from "react";
import axios from "axios";

import * as S from "../../styles/PostStyles.ts";
import Postc from "./PostCard.jsx";
const API = process.env.REACT_APP_API_SERVER;

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const POSTS_PER_PAGE = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${API}/posts/all?page=${page}&size=${POSTS_PER_PAGE}`,
          {
            withCredentials: true,
          }
        );
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
        console.log(res.data);
      } catch (err) {
        console.error("게시글 불러오기 실패", err);
      }
    };

    fetchPosts();
  }, [page]);

  return (
    <>
      <Postc posts={posts} />
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
    </>
  );
};
export default PostList;
