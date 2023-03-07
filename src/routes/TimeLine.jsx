import styled from "styled-components"
import NavBar from "../components/NavBar"

export default function TimeLine() {
    return (
        <Container>
            <NavBar />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;

    justify-content: space-between;

    background-color: #333333;
`