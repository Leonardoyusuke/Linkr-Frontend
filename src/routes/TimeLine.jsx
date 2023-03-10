import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import AddPost from "../components/AddPost";

export default function TimeLine() {
  const { infosUser } = useContext(AuthContext);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  useEffect(() => {
    if (!infosUser) {
      return navigate("/");
    }
    const res = axios.get(`${REACT_APP_API_URL}/posts`, {
      headers: { Authorization: `Bearer ${infosUser.token}` },
    });
    res.then((res) => {
      setPost(res.data);
      setLoading(true);
    });
    res.catch(() => {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
      setLoading(true);
    });
  }, [REACT_APP_API_URL, infosUser, navigate, formSubmitted]);
  if (!infosUser) {
    return navigate("/");
  }
  if (!loading) {
    return <Loading />;
  }
  return (
    <Container>
      <NavBar />
      <ContainerAddPost>
        <div>
          <h1>timeline</h1>
        </div>
        <AddPost
          pictureUrl={localStorage.getItem("userImgUrl")}
          setFormSubmitted={setFormSubmitted}
        />
      </ContainerAddPost>
      {post.length !== 0 ? (
        <ContainerPosts>
          {post.map((p) => (
            <Post body={p} />
          ))}
        </ContainerPosts>
      ) : (
        <div>There are no posts yet</div>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  flex-direction: column;
  background-color: #333333;
`;

const ContainerAddPost = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 30px;
  h1 {
    color: #ffffff;
    margin-bottom: 40px;
  }
  div {
    width: 600px;
  }
`;

const ContainerPosts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: fit-content;
`;
