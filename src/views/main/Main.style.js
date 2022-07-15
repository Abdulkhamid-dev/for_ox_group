import styled from "styled-components";

export const StyledMain = styled.div`
  padding: 20px;
  background-color: #f4f5f7;
  h3 {
    font-size: 32px;
    font-weight: bold;
  }
  header {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 10px;
    .search_block {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 350px;
      background: #fff;
      padding: 4px;
      border-radius: 4px;
      input {
        width: 100%;
        outline: none;
        border: none;
        background: transparent;
      }
    }
  }
  .log_out{
    cursor: pointer;
  }
`;
