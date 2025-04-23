import styled from "styled-components";

export const WrapperTitle = styled.div`
  padding: 20px 0;

  @media (max-width: 767px) {
    padding: 16px 0;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  margin: 0;

  @media (max-width: 767px) {
    font-size: 24px;
  }
`;

export const CategoryBox = styled.div`
  display: flex;
  gap: 6px;
  font-size: 13px;
  background: #f0f0f0;
  padding: 4px 10px;
  border-radius: 12px;
  color: #555;

  @media (max-width: 767px) {
    font-size: 12px;
  }
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #777;
  font-size: 14px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    font-size: 13px;
  }
`;

export const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  background: #ddd;

  @media (max-width: 767px) {
    width: 28px;
    height: 28px;
  }
`;

export const Nickname = styled.span`
  font-weight: 500;
`;

export const InfoText = styled.span`
  margin-left: auto;
  color: #999;

  @media (max-width: 767px) {
    margin-left: 0;
    font-size: 12px;
  }
`;

export const ContentImage = styled.img`
  display: block;
  margin: 20px auto;
  max-width: 70%;
  height: auto;
  border-radius: 8px;

  @media (max-width: 767px) {
    max-width: 100%;
    margin: 16px 0;
  }
`;

export const PostContent = styled.div`
  max-width: 700px;
  font-size: 16px;
  line-height: 1.6;
  color: #333;

  @media (max-width: 767px) {
    font-size: 14px;
    padding: 0 4px;
  }
`;

export const CommentSection = styled.div`
  margin-top: 40px;
  background-color: #f9f9fb;
  padding: 20px;
  border-radius: 12px;

  @media (max-width: 767px) {
    padding: 16px;
    margin-top: 24px;
  }
`;

export const CommentForm = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;

    @media (max-width: 767px) {
      font-size: 13px;
      padding: 8px;
    }
  }

  button {
    padding: 10px 16px;
    background-color: rgb(229, 162, 162);
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background-color: #88b3d6;
    }

    @media (max-width: 767px) {
      font-size: 13px;
      padding: 8px 12px;
    }
  }

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const LoginNotice = styled.p`
  font-size: 14px;
  color: #666;

  span a {
    color: #3d8bff;
    text-decoration: underline;
    margin-left: 8px;
  }

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

export const CommentItem = styled.div`
  border-bottom: 1px solid #e0e0e0;
  padding: 12px 0;

  &:last-child {
    border-bottom: none;
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

export const CommentMeta = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 2px;
`;

export const CommentContent = styled.p`
  font-size: 14px;
  margin: 6px 0 0 0;
  line-height: 1.5;

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;
