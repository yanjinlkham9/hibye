import styled from "styled-components";

export const FormContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 32px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);

  @media (max-width: 767px) {
    margin: 20px 10px;
    padding: 24px 16px;
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;

    @media (max-width: 767px) {
      font-size: 13px;
    }
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 12px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    transition: border 0.2s;

    &:focus {
      border-color: #c36975;
    }

    @media (max-width: 767px) {
      font-size: 13px;
      padding: 10px;
    }
  }

  textarea {
    height: 150px;
    resize: vertical;

    @media (max-width: 767px) {
      height: 120px;
    }
  }
`;

export const ImagePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #ddd;

    @media (max-width: 767px) {
      width: 80px;
      height: 80px;
    }
  }
`;

export const SubmitButton = styled.button`
  display: block;
  margin-top: 30px;
  padding: 12px 24px;
  background-color: #c36975;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #005fa3;
  }

  @media (max-width: 767px) {
    width: 100%;
    font-size: 14px;
    padding: 10px 20px;
  }
`;
