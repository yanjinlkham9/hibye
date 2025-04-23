import styled from "styled-components";

export const PageWrapper = styled.div`
  max-width: 640px;
  margin: 50px auto;
  padding: 36px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(195, 105, 117, 0.15);

  @media (max-width: 767px) {
    padding: 24px 12px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;

  @media (max-width: 767px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

export const ProfileImageContainer = styled.div`
  text-align: center;
  margin-bottom: 16px;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 8px;

    @media (max-width: 767px) {
      width: 100px;
      height: 100px;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 767px) {
    gap: 14px;
  }
`;

export const Label = styled.label`
  font-weight: 600;
  margin-bottom: 4px;

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

export const Input = styled.input`
  width: 100%;
  flex: 1;
  outline: none;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;

  @media (max-width: 767px) {
    font-size: 13px;
    padding: 9px;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;

  @media (max-width: 767px) {
    font-size: 13px;
    padding: 9px;
  }
`;

export const Button = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  background-color: #e0e0e0;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #ccc;
  }

  @media (max-width: 767px) {
    font-size: 14px;
    padding: 10px;
  }
`;

export const NickCheckMessage = styled.span`
  font-size: 12px;
  color: ${(props) => (props.valid ? "green" : "red")};

  @media (max-width: 767px) {
    font-size: 11px;
  }
`;

export const NickInputWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  /* margin-top: 6px; */

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;

  @media (max-width: 767px) {
    gap: 8px;
  }
`;

export const CheckButton = styled.button`
  padding: 10px 16px;
  background-color: #c36975;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #a95361;
  }

  @media (max-width: 767px) {
    font-size: 13px;
    padding: 9px 14px;
  }
`;

export const DangerButton = styled(CheckButton)`
  background-color: #e53935;

  &:hover {
    background-color: #c62828;
  }
`;
