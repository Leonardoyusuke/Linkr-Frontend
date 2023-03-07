import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { FallingLines } from "react-loader-spinner"

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [picture_url, setPictureUrl] = useState('')

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    function handleSignup(e) {
        e.preventDefault()
        setLoading(true)

        if (email === '' || password === '' || username === '' || picture_url === '') {
            alert('Please fill in all fields')
            setLoading(false)
            return
        }

        const body = {
            email: email,
            password: password,
            username: username,
            picture_url: picture_url
        }

        const promise = axios.post(process.env.REACT_APP_API_URL + '/signup', body)
        promise.then(res => navigate('/'))
        promise.catch(err => {
            setLoading(false)
            if (err.response.status == 409) return alert("This email is already registered")
            console.log(err.response)
        })


    }

    return (
        <Container>
            <LogoContainer>
                <h1>linkr</h1>
                <p>save, share and discover the best links on the web</p>
            </LogoContainer>
            <SigninContainer>
                <form onSubmit={e => handleSignup(e)}>
                    <input type="email" placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)}></input>
                    <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                    <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}></input>
                    <input type="text" placeholder="picture url" value={picture_url} onChange={e => setPictureUrl(e.target.value)}></input>

                    <button type="submit" disabled={loading}>
                        {(loading) ?
                            <FallingLines
                                color="#ffff"
                                width="60"
                                visible={true}
                                ariaLabel='falling-lines-loading'
                            /> :
                            "Sign Up"
                        }
                    </button>
                </form>
                <Link to='/'>
                    Switch back to log in
                </Link>
            </SigninContainer>
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
const SigninContainer = styled.div`
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