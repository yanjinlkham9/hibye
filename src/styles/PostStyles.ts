import styled from "styled-components";

export const Container = styled.div`
  padding: 10px;

  @media (max-width: 767px) {
    padding: 8px;
  }
`;

export const PostCard = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #ddd;
  transition: background 0.2s;

  &:hover {
    background: #f9f9f9;
  }

  @media (max-width: 767px) {
    padding: 10px 6px;
  }
`;

export const ProfileImg = styled.img`
  width: 62px;
  height: 62px;
  margin-right: 12px;
  object-fit: cover;

  @media (max-width: 767px) {
    width: 48px;
    height: 48px;
    margin-right: 8px;
  }
`;

export const PostInfo = styled.div`
  flex: 1;
`;

export const Title = styled.h3`
  font-size: 16px;
  margin: 0 0 6px;
  color: #111;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

export const Details = styled.div`
  font-size: 12px;
  color: #666;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 767px) {
    font-size: 11px;
    gap: 8px;
  }
`;

export const PaginationWrapper = styled.div`
  text-align: center;
  margin-top: 20px;

  @media (max-width: 767px) {
    margin-top: 16px;
  }
`;

export const PageButton = styled.button<{ active: boolean }>`
  margin: 0 5px;
  padding: 6px 12px;
  background-color: ${({ active }) => (active ? "#c36975" : "#eee")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 767px) {
    padding: 5px 10px;
    font-size: 13px;
    margin: 0 3px;
  }
`;
