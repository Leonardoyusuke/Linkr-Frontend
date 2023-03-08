import React from "react";
import styled from "styled-components";

export default function Post({ username, picture_url, description, url }) {
  return (
    <ContainerPost>
      <div>
        <img src={picture_url} alt="image_post" />
      </div>
      <div>
        <h1>{username}</h1>
        <h2>{description}</h2>
        <section>{url}</section>
      </div>
    </ContainerPost>
  );
}

const ContainerPost = styled.div`
  background-color: #171717;
  color: #7b7b7b;
  width: 500px;
  height: fit-content;
  border-radius: 15px;
  border: none;
  margin-bottom: 20px;
  font-size: 20px;
  padding: 10px;
  display: flex;
  div:first-child {
    width: fit-content;
    img {
      width: 40px;
      height: 40px;
      border-radius: 100%;
    }
  }
  div:last-child {
    margin-left: 10px;
    width: calc(100% - 40px - 10px);
    h1 {
      font-size: 20px;
    }
    h2 {
      font-size: 18px;
    }
  }
`;
