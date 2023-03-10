import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../components/Post";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import AddPost from "../components/AddPost";

export default function TagPage(props) {
  const { REACT_APP_API_URL } = process.env;

  const navigate = useNavigate();

  const { infosUser } = useContext(AuthContext);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const params = useParams();
  const tag = `#${params.tag}`;

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
      alert("An error occured while trying to fetch the posts, please refresh the page");
      setLoading(true);
    });
  }, [REACT_APP_API_URL, infosUser, navigate, formSubmitted]);
  if (!loading) {
    return <Loading />;
  }
  return (
    <Container>
      <NavBar />
      <h1>{tag}</h1>
      {post.length !== 0 ? (
        <ContainerPosts>
          {post.map((p) => {
            console.log(p, tag);
            if (p.description && p.description.includes(tag)) {
              return (
                <Post
                  key={p.id}
                  body={p}
                  liked={p.likesUserId.includes(parseInt(infosUser.userId))}
                />
              );
            }
          })}
        </ContainerPosts>
      ) : (
        <div>There are no posts yet</div>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 600px;
  background-color: #333333;
  > h1 {
    display: block;
    justify-content: left;
    width: 600px;
    margin-top: 80px;
    color: #ffffff;
    margin-bottom: 40px;
  }
`;

const ContainerPosts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: fit-content;
`;
