import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as S from "../../styles/mixin";
import * as T from "../../styles/PostDetailStyle";
import { Link } from "react-router-dom";
const API = process.env.REACT_APP_API_SERVER;

export default function PostDetails() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const isLoggedIn = useSelector((state) => state.isLogin.isLoggedIn);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API}/posts/${id}`, {
          withCredentials: true,
        });
        setPostData(res.data);
      } catch (err) {
        setPostData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // 댓글 목록 조회
  useEffect(() => {
    axios
      .get(`${API}/posts/comments/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setComments(res.data);
      });
  }, [id]);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    try {
      await axios.post(
        `${API}/posts/comments`,
        {
          postId: parseInt(id),
          content: commentText,
        },
        {
          withCredentials: true,
        }
      );
      setCommentText("");

      // 댓글 목록 새로고침
      const res = await axios.get(`${API}/posts/comments/${id}`, {
        withCredentials: true,
      });
      setComments(res.data);
    } catch (err) {
      alert("댓글 등록 실패!");
    }
  };

  if (!postData) return <div>게시글을 불러올 수 없습니다.</div>;

  if (isLoading) return <div>Loading...</div>;
  return (
    <S.MainLayout>
      <T.WrapperTitle>
        <T.TitleRow>
          <T.Title>{postData.title}</T.Title>
          <T.CategoryBox>
            <span>📂 {postData.category}</span>
          </T.CategoryBox>
        </T.TitleRow>
        <T.MetaRow>
          <T.ProfileImg src={postData.profile_pic} alt="작성자 프로필" />
          <T.Nickname>{postData?.nickname || "탈퇴한 사용자"}</T.Nickname>
          <br />
          <br />
          <T.InfoText>
            📅{new Date(postData.createdAt).toLocaleString()}
          </T.InfoText>
        </T.MetaRow>
      </T.WrapperTitle>

      {postData.imagePaths &&
        postData.imagePaths
          .split(",")
          .map((url, idx) => (
            <T.ContentImage key={idx} src={url} alt="이미지" />
          ))}

      <T.PostContent>{postData.content}</T.PostContent>

      <T.CommentSection>
        <h3>댓글</h3>

        {isLoggedIn ? (
          <T.CommentForm>
            <input
              type="text"
              placeholder="댓글을 입력하세요"
              value={commentText}
              onChange={handleCommentChange}
            />
            <button onClick={handleCommentSubmit}>등록</button>
          </T.CommentForm>
        ) : (
          <T.LoginNotice>
            ※ 로그인한 사용자만 댓글을 작성할 수 있습니다.
            <span>
              <Link to="/user/login">로그인하러가기</Link>
            </span>
          </T.LoginNotice>
        )}

        {comments.map((cmt, index) => (
          <T.CommentItem key={index}>
            <T.CommentHeader>
              <T.ProfileImg src={cmt.profile_pic} alt="작성자 프로필" />
              {cmt?.nickname || "탈퇴한 사용자"}
            </T.CommentHeader>
            <T.CommentMeta>
              {new Date(cmt.createdAt).toLocaleString()}
            </T.CommentMeta>
            <T.CommentContent>{cmt.content}</T.CommentContent>
          </T.CommentItem>
        ))}
      </T.CommentSection>
    </S.MainLayout>
  );
}
