import React, { useEffect, useState } from "react";
import * as S from "../../styles/mixin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as F from "../../styles/CreatePostStyle";

const API = process.env.REACT_APP_API_SERVER;

const CreatePost = () => {
  const [images, setImages] = useState([]);
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.isLogin.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/user/login");
    }
  }, []);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      alert("최대 5개의 이미지만 업로드할 수 있습니다.");
      return;
    }
    setImages([...images, ...files]);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append(
      "post",
      new Blob([JSON.stringify({ ...formData, content })], {
        type: "application/json",
      })
    );
    images.forEach((file) => formDataToSend.append("images", file));

    try {
      await axios.post(`${API}/posts`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("게시글이 등록되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("등록 실패");
    }
  };

  return (
    isLoggedIn && (
      <S.MainLayout>
        <F.FormContainer>
          <h2>글 쓰기</h2>
          <form onSubmit={handleSubmit}>
            <F.InputGroup>
              <label htmlFor="title">제목</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </F.InputGroup>

            <F.InputGroup>
              <label htmlFor="category">카테고리</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">카테고리를 선택하세요</option>
                <option value="skincare">스킨케어</option>
                <option value="makeup">색조</option>
                <option value="tools">도구</option>
                <option value="bodycare">헤어&바디</option>
                <option value="etc">기타</option>
              </select>
            </F.InputGroup>

            <F.InputGroup>
              <label>내용</label>
              <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="내용을 입력하세요"
              />
            </F.InputGroup>

            <F.InputGroup>
              <label>사진 업로드 (최대 5개)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
              <F.ImagePreview>
                {images.map((file, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt={`미리보기 ${idx + 1}`}
                  />
                ))}
              </F.ImagePreview>
            </F.InputGroup>

            <F.SubmitButton type="submit">등록</F.SubmitButton>
          </form>
        </F.FormContainer>
      </S.MainLayout>
    )
  );
};

export default CreatePost;
