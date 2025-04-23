import styled from "styled-components";

export const RegisterContainer = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 36px;
  background-color: #fff9f9;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(195, 105, 117, 0.15);

  @media (max-width: 767px) {
    margin: 30px 10px;
    padding: 24px 16px;
  }
`;

export const Title = styled.h3`
  text-align: center;
  color: #c36975;
  font-size: 24px;
  margin-bottom: 20px;

  @media (max-width: 767px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 18px;

  label {
    display: block;
    font-weight: 500;
    margin-bottom: 6px;
    color: #333;

    @media (max-width: 767px) {
      font-size: 13px;
    }
  }
`;

export const InlineInputGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

export const TextInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #c36975;
  }

  @media (max-width: 767px) {
    font-size: 13px;
    padding: 9px 10px;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #c36975;
  }

  @media (max-width: 767px) {
    font-size: 13px;
    padding: 9px 10px;
  }
`;

export const CheckButton = styled.button`
  padding: 10px 16px;
  background-color: #f0e2e4;
  color: #c36975;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #e3d1d3;
  }

  @media (max-width: 767px) {
    font-size: 12px;
    padding: 9px 12px;
    width: 100%;
  }
`;

export const Error = styled.p`
  color: #d33;
  font-size: 14px;
  margin-top: 6px;

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

export const Success = styled.span`
  color: green;
  font-size: 13px;
  margin-top: 6px;
  display: inline-block;

  @media (max-width: 767px) {
    font-size: 12px;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  background-color: #c36975;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 767px) {
    padding: 10px;
    font-size: 14px;
  }
`;

export const LinkBox = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 14px;

  a {
    margin-left: 6px;
    color: #c36975;
    font-weight: bold;
    text-decoration: underline;
  }

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;
