import React from "react";
import styled from "styled-components";
import { ReactTagify } from "react-tagify";

export default function Post({ username, pictureUrl, description, url }) {
  // async function getMetadata(url) {
  //   try {
  //     const metadata = await urlMetadata(url);
  //     console.log(metadata);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  return (
    <ContainerPost>
      <div>
        <img src={pictureUrl} alt="imagePost" />
      </div>
      <div>
        <h1>{username}</h1>
        <ReactTagify colors="white" tagClicked={(tag)=> console.log(tag)}>
        <h2>{description}</h2>
        </ReactTagify>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <section>{url}</section>
        </a>
      </div>
    </ContainerPost>
  );
}

const ContainerPost = styled.div`
  background-color: #171717;
  color: #b7b7b7;
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
      color: #ffffff;
      font-size: 20px;
    }
    h2 {
      font-size: 18px;
    }
  }
`;
