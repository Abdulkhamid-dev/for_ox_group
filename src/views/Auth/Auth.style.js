import styled from 'styled-components';

export const StyledSignUp = styled.section`
  min-height: 100vh;
  background-image: url(${(props) => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;

  .ant-form {
    width: 50%;
    padding: 30px 0px;
    margin: auto;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    background-color: #00000094;

    h1 {
      margin-bottom: 20px;
      font-size: 30px;
      font-weight: bolder;
      text-align: center;
      color: white;
    }
    .ant-form-item {
      width: 85%;
      margin: auto;
      margin-bottom: 10px;
    }
    .ant-form-item-control {
      max-width: 100%;
    }
    .ant-form-item-control {
      margin-left: 0;
    }
    .ant-btn {
      width: 100%;
      height: 40px;
      margin-top: 10px;

      span {
        font-size: 16px;
      }
    }
    label {
      color: white;
    }
    p {
      margin-top: 15px;
      text-align: center;
      font-size: 16px;

      a {
        font-weight: bolder;
      }
    }
  }

  @media (max-width: 600px) {
    background-color: white;

    .ant-form {
      width: 100%;
    }
  }
`;
