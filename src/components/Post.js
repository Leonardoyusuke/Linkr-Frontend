import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { ReactTagify } from "react-tagify";
// import urlMetadata from "url-metadata";
import { useNavigate } from "react-router-dom";

export default function Post({ body,userId }) {
    const navigate = useNavigate()
  const [clickLike, setClickLike] = useState(true);
  return (
    <ContainerPost>
      <div>
        <img src={body.pictureUrl} alt="imagePost" />
        <ContainerLike
          clicked={clickLike}
          onClick={() => {
            setClickLike((current) => !current);
          }}>
          {clickLike ? <AiOutlineHeart /> : <AiFillHeart />}
        </ContainerLike>
      </div>
      <div>
        <h1  onClick={() => navigate(`/user/${body.userId}`)} >{body.username}</h1>
        <ReactTagify colors="white" tagClicked={(tag)=> console.log(tag)}>
        <h2>{body.description}</h2>
        </ReactTagify>
        <a href={body.url} target="_blank" rel="noopener noreferrer">
          <section>
            <div>
              <h1>{body.urlTitle}</h1>
              <h2>{body.urlDescription}</h2>
              <h3>{body.url}</h3>
            </div>
            <div>
              <img src={body.urlImage} alt="imagePost" />
            </div>
          </section>
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
  section {
    display: flex;
    box-sizing: border-box;
    width: 500px;
    height: 150px;
    border: 1px solid #4d4d4d;
    border-radius: 11px;
    img {
      width: 153.44px;
      height: 150px;
      border-radius: 0px 12px 13px 0px;
    }
    h1 {
      font-size: 16px;
    }
    h2 {
      font-size: 11px;
    }
    h3 {
      font-size: 11px;
    }
  }
`;

const ContainerLike = styled.div`
  color: ${(props) => (props.clicked ? "" : "red")};
`
