import styled from "styled-components";

export const ModalStyled = styled.div`
  @media screen and (max-width: 767px) {
    .overlay {
      position: fixed;
      top: 0;
      left: 0;

      margin-top: 80px;

      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      /* align-items: center; */
      background-color: #264061;
      z-index: 1200;
      overflow: auto;

      .Modal {
        position: relative;
        background-color: #3d3d3d;
        border-radius: 14px;
        overflow: hidden;
      }
    }
  }
  @media screen and (min-width: 767px) {
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--modal--bg-colour);
      z-index: 999;
    }

    .modal {
      max-width: calc(100vw - 48px);
      max-height: calc(100vh - 24px);
    }
  }
`;