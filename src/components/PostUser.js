import React from "react";
import styled from "styled-components";
// import urlMetadata from "url-metadata";
import { useNavigate } from "react-router-dom";

export default function PostUser({ username, pictureUrl, description, url, userId }) {
  const navigate = useNavigate()

  return (
    <ContainerPost>
      <div>
        <img src={pictureUrl} alt="imagePost" />
      </div>
      <div>
        <h1  >{username}</h1>
        <h2>{description}</h2>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <section>{url}</section>
        </a>
      </div>
    </ContainerPost>
  );
}

const ContainerPost = styled.div`
  background-color: #171717;
  color: #7b7b7b;
  width: 600px;
  height: fit-content;
  border-radius: 15px;
  border: none;
  margin-bottom: 20px;
  font-size: 20px;
  padding: 15px;
  display: flex;
  div:first-child {
    width: fit-content;
    img {
      width: 50px;
      height: 50px;
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
