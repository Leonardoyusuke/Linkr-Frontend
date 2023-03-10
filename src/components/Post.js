import React, { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { ReactTagify } from "react-tagify";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Post({ body, liked }) {
  const [clickLike, setClickLike] = useState(!liked);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { REACT_APP_API_URL } = process.env;
  const { infosUser } = useContext(AuthContext);
  const navigate = useNavigate();

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

  async function handleTag(tag){
    const normalizedTag = tag.match(/[\wñÑáéíóúÁÉÍÓÚãÃõÕâÂêÊôÔ]+/g)[0];
    const cleanTag = tag.match(/#[\wñÑáéíóúÁÉÍÓÚãÃõÕâÂêÊôÔ]+/g)[0];
    // const updateClicks = await axios.post()
    navigate(`/hashtag/${normalizedTag}`, {cleanTag: cleanTag})
  }

  return (
    <ContainerPost>
      <div>
        <img src={body.pictureUrl} alt="imagePost" />
        <ContainerLike
          clicked={clickLike}
          onClick={() => {
            like(body.id);
          }}
          disabled={buttonDisabled}>
          {clickLike ? <AiOutlineHeart /> : <AiFillHeart />}
        </ContainerLike>
        <div>
          <div data-tip="Tooltip content" data-for="my-button">
            {body.likes} likes
          </div>
          <Tooltip id="my-button" effect="solid">
            This is the tooltip content
          </Tooltip>
        </div>
      </div>
      <div>
        <h1>{body.username}</h1>
        {body.description ? (
          <ReactTagify
            colors="white"
            tagClicked={(tag) => handleTag(tag)}
          >
            <h2>{body.description}</h2>
          </ReactTagify>
        ) : (
          <h2>{body.description}</h2>
        )}
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
  width: 100%;
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
  cursor: pointer;
`;
