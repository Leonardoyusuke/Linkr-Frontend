import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { FallingLines } from "react-loader-spinner"
import { GlobalContext } from "../contexts/GlobalContext"

export default function SigninPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const { setUserImgUrl } = useContext(GlobalContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("userToken")) navigate('/timeline')
    }, [])

    function handleLogin(e) {
        e.preventDefault()
        setLoading(true)

        if (email === '' || password === '') return alert('Please fill in all fields')

        const body = {
            email: email,
            password: password
        }

        const promise = axios.post(process.env.REACT_APP_API_URL + '/signin', body)
        promise.then(res => {
            localStorage.setItem("userToken", res.data.token)

            if (res.data.imgUrl) {
                setUserImgUrl(res.data.imgUrl)
                localStorage.setItem("userImgUrl", res.data.imgUrl)
            }

            navigate("/timeline")
            setLoading(false)
        })
        promise.catch(err => {
            setLoading(false)
            if (err.response.status === 401) return alert("E-mail or password invalid!")
        })
    }

    return (
        <Container>
            <LogoContainer>
                <h1>linkr</h1>
                <p>save, share and discover the best links on the web</p>
            </LogoContainer>
            <LoginContainer>
                <form onSubmit={e => handleLogin(e)}>
                    <input type="email" placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)}></input>
                    <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}></input>

                    <button type="submit" disabled={loading}>
                        {(loading) ?
                            <FallingLines
                                color="#ffff"
                                width="60"
                                visible={true}
                                ariaLabel='falling-lines-loading'
                            /> :
                            "Log In"
                        }
                    </button>
                </form>
                <Link to='/sign-up'>
                    First time? Create an account!
                </Link>
            </LoginContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;

    justify-content: space-between;

    background-color: #151515;
    color: #ffff;

    font-family: 'Passion One', cursive;
`
const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: center;
    width: 450px;

    margin-left: 10%;

    > h1{
        font-size: 106px;
    }
    >p{
        font-size: 43px;
        font-weight: 700;
        font-family: 'Oswald', sans-serif;
    }
`
const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 40%;

    justify-content: center;
    align-items: center;

    >form{
        display: flex;
        flex-direction: column;
        width: 80%;

        >input{
            width: 100%;
            height: 65px;
            margin-bottom: 15px;

            font-family: 'Oswald', sans-serif;
            font-size: 27px;
            font-weight: 700;
            color: #9F9F9F;
            
            padding: 0 15px;

            border: none;
            border-radius: 6px;
        }

        >button{
            font-family: 'Oswald', sans-serif;
            font-size: 27px;
            font-weight: 700;
            color: #ffff;

            width: 100%;
            height: 65px;

            border: none;
            border-radius: 6px;

            cursor: pointer;
            background-color: #1877F2;
        }

    }

    >a{
        font-family: 'Lato', sans-serif;
        font-size: 20px;
        color: #ffff;
        margin-top: 20px;
        text-decoration: none ;

        border-bottom: 1px #ffff solid;
    }
    background-color: #333333;
`