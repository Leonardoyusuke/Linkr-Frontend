import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useParams} from "react-router-dom";
import PostUser from "../components/PostUser.js";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";


export default function UserTimeLine() {
  const { infosUser } = useContext(AuthContext);
  const { infoUsername,setInfoUsername } = useContext(AuthContext)
  const [postUser, setPostUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  const userId = useParams().id;
  useEffect(() => {
    if (!infosUser) {
      return navigate("/");
    }
    const res = axios.get(`${REACT_APP_API_URL}/posts/${userId}`,  {
      headers: { Authorization: `Bearer ${infosUser.token}` },
    });
    res.then((res) => {
      setPostUser(res.data);
      setInfoUsername(res.data[0].username)
      console.log(res.data[0].username,"res")
      
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
      <ContainerAddPost>
          <h1>{infoUsername}'s posts</h1>

      </ContainerAddPost>
      {postUser.length !== 0 ? (
        <ContainerPosts>
          {postUser.map((p) => (
            <PostUser
              userId={p.userId}
              username={p.username}
              pictureUrl={p.pictureUrl}
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
  height: 100vh;
  width: 100vw;
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
