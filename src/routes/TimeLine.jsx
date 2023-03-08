import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";

export default function TimeLine() {
  const { infosUser } = useContext(AuthContext);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
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
  }, [REACT_APP_API_URL, infosUser, navigate]);
  if (!infosUser) {
    return navigate("/");
  }
  if (!loading) {
    return <Loading />;
  }
  return (
    <Container>
      <NavBar />
      {post.length !== 0 ? (
        <ContainerPosts>
          {post.map((p) => (
            <Post
              username={p.username}
              picture_url={p.picture_url}
              description={p.description}
              url={p.url}
            />
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
  height: 100%;
  width: 100vw;
  justify-content: space-between;
  flex-direction: column;
  background-color: #333333;
`;

const ContainerPosts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: fit-content;
`;
