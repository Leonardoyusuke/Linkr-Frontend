import styled from "styled-components"
import { AiOutlineDown } from "react-icons/ai"
import { IconContext } from "react-icons"
import { useState } from "react"
import SearchBar from "./SearchBar"


export default function NavBar(imgUrl) {
    const [menu, setMenu] = useState(false)
    function toggleMenu() {
        setMenu(!menu)
    }
    

    return (
        <Container>
            <Logo>
                linkr
            </Logo>
            
            <SearchBar/>

            <Menu menu={menu} onClick={toggleMenu}>
                <div>
                    <IconContext.Provider value={{ color: "white", size: '1.7em' }}>
                        <AiOutlineDown />
                    </IconContext.Provider>
                </div>
                <UserImg src={imgUrl} alt='' />
            </Menu>
            <Options menu={menu}>
                <p>Logout</p>
            </Options>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    height: 70px;
    width: 100%;

    align-items: center;
    justify-content: space-between;

    padding: 0 20px 0 30px;

    background-color: #151515;
`
const Logo = styled.div`
    font-family: 'Passion One', cursive;
    color: #ffff;
    font-size: 49px;
`
const Menu = styled.div`
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 90px;
    
    >div{
        display: flex;
        align-items: center;

        rotate: ${props => (props.menu) ? "180deg" : 0};
    }
`
const UserImg = styled.img`
    display: flex;
    width: 53px;
    height: 53px;

    object-fit: cover;
    background-color: gray;

    border-radius: 50%;
`
const Options = styled.div`
    display: flex;
    cursor: pointer;

    position: fixed;
    z-index: ${props => (props.menu) ? 1 : -1};
    right: 0;
    top: ${props => (props.menu) ? "70px" : 0};

    width: 150px;
    height: 47px;

    border-radius: 0 0 0 20px;

    color: #ffff;
    align-items: center;
    justify-content:center;

    font-size: 17px;
    font-family: 'Lato', sans-serif;

    background-color: #151515;
`