import styled from "styled-components";

export const LoginContainer = styled.div`
  max-width: 400px;
  margin: 60px auto;
  padding: 32px;
  background-color: #fffafc;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(195, 105, 117, 0.2);

  @media (max-width: 767px) {
    margin: 40px 10px;
    padding: 24px 16px;
  }
`;

export const Title = styled.h3`
  color: #c36975;
  text-align: center;
  margin-bottom: 24px;
  font-size: 24px;

  @media (max-width: 767px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 6px;
    color: #333;
    font-weight: 500;

    @media (max-width: 767px) {
      font-size: 13px;
    }
  }

  input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    outline: none;

    &:focus {
      border-color: #c36975;
    }

    @media (max-width: 767px) {
      font-size: 13px;
      padding: 9px 10px;
    }
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #c36975;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  margin-top: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #a44f5e;
  }

  @media (max-width: 767px) {
    padding: 10px;
    font-size: 14px;
  }
`;

export const ErrorMessage = styled.p`
  color: #d33;
  font-size: 14px;
  margin-top: 10px;

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

export const SignupLink = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;

  a {
    color: #c36975;
    font-weight: bold;
    margin-left: 6px;
    text-decoration: underline;
  }

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;
