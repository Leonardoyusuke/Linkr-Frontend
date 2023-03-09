import React from "react";
import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export default function AddPost({ pictureUrl, setFormSubmitted }) {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonValue, setButtonValue] = useState("Publish");
  const { infosUser } = useContext(AuthContext);
  const { REACT_APP_API_URL } = process.env;
  async function submit(e) {
    e.preventDefault();
    setButtonDisabled(true);
    setButtonValue("Publishing");
    setFormSubmitted(true);
    try {
      const payload =
        description !== ""
          ? {
              url,
              description,
            }
          : { url };
      await axios.post(`${REACT_APP_API_URL}/posts`, payload, {
        headers: { Authorization: `Bearer ${infosUser.token}` },
      });
      setButtonDisabled(false);
      setFormSubmitted(false);
      setUrl("");
      setDescription("");
      setButtonValue("Publish");
    } catch (res) {
      console.log(res.response.status);
      alert("There was an error publishing your link");
      setButtonDisabled(false);
      setFormSubmitted(false);
      setUrl("");
      setDescription("");
      setButtonValue("Publish");
    }

    return;
  }
  return (
    <ContainerAddPost>
      <div>
        <img src={pictureUrl} alt="profilePicture" />
      </div>
      <div>
        <h1>What are you going to share today?</h1>
        <form onSubmit={submit}>
          <input
            type={"text"}
            placeholder={"http://..."}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={buttonDisabled}></input>
          <input
            type={"text"}
            placeholder={"Awesome article about #javascript"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={buttonDisabled}></input>
          <input
            type={"submit"}
            value={buttonValue}
            disabled={buttonDisabled}></input>
        </form>
      </div>
    </ContainerAddPost>
  );
}

const ContainerAddPost = styled.div`
  background: #ffffff;
  width: 600px;
  height: 200px;
  border-radius: 15px;
  border: none;
  margin-bottom: 20px;
  font-size: 20px;
  padding: 15px;
  display: flex;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
  }
  div:first-child {
    width: fit-content;
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
  div:last-child h1 {
    color: #707070;
  }
  form {
    display: flex;
    flex-direction: column;
  }
`;
