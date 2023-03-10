import React from "react";
import styled from "styled-components";
// import urlMetadata from "url-metadata";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { ReactTagify } from "react-tagify";
import { AuthContext } from "../contexts/AuthContext"

export default function PostUser({ username, pictureUrl, description, url, userId, body, liked }) {
  const navigate = useNavigate()
  const [clickLike, setClickLike] = useState(!liked);
  const { infosUser } = useContext(AuthContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { REACT_APP_API_URL } = process.env;

  async function like(postId) {
    setButtonDisabled(true);
    setClickLike((current) => !current);
    try {
      await axios.post(
        `${REACT_APP_API_URL}/likes`,
        { postId },
        {
          headers: { Authorization: `Bearer ${infosUser.token}` },
        }
      );
      setButtonDisabled(false);
    } catch (res) {
      console.log(res.response.status);
      setClickLike((current) => !current);
      setButtonDisabled(false);
    }
    return;
  }

  return (
    <ContainerPost data-test="post">
      <div>
        <img src={pictureUrl} alt="imagePost" />
        <ContainerLike
          data-test="like-btn"
          clicked={clickLike}
          onClick={() => {
            like(body.id);
          }}
          disabled={buttonDisabled}>
          {clickLike ? <AiOutlineHeart /> : <AiFillHeart />}
        </ContainerLike>
        <div>
          <div data-tip="Tooltip content" data-for="my-button">
            {/* {body.likes} likes */}
          </div>
          <Tooltip data-test="tooltip" id="my-button" effect="solid">
            This is the tooltip content
          </Tooltip>
        </div>
      </div>
      <div>
        <h1 data-test="username" >{username}</h1>
        <h2 data-test="description">{description}</h2>
        <a data-test="link" href={url} target="_blank" rel="noopener noreferrer">
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
const ContainerLike = styled.div`
  color: ${(props) => (props.clicked ? "" : "red")};
  cursor: pointer;
`
