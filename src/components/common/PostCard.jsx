import { Link } from "react-router-dom";
import * as M from "../../styles/mixin.js";
import * as S from "../../styles/PostStyles.ts";

const S3 = process.env.REACT_APP_S3;

export default function Postcard({ posts }) {
  const categoryMap = {
    skincare: "스킨케어",
    makeup: "메이크업",
    tools: "도구",
    bodycare: "헤어/바디",
    etc: "기타",
  };
  return (
    <M.MainLayout>
      <S.Container>
        {posts.map((post) => (
          <S.PostCard key={post.id}>
            <S.ProfileImg
              src={
                post.imagePaths && post.imagePaths.trim().length > 0
                  ? post.imagePaths.split(",")[0]
                  : `${S3}/post-images/17e516a82920f1ad276a0s22457acaca7.jpg`
              }
              alt="대표 이미지"
            />
            <S.PostInfo>
              <Link to={`/posts/${post.id}`}>
                <S.Title>{post.title}</S.Title>
              </Link>
              <S.Details>
                <span>👤 {post.nickname}</span>
                <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                <span>💬 {post.commentCount || 0}</span>
                <span>📂 {categoryMap[post.category]}</span>
              </S.Details>
            </S.PostInfo>
          </S.PostCard>
        ))}
      </S.Container>
    </M.MainLayout>
  );
}
