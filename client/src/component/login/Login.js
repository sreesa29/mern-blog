import { useLayoutEffect, useState  } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import ValidationError from './ValidationError'
import "./login.css"
import Footer from "./Footer";
import Headerlogreg from '../header/Headerlogreg';

function Login() {

    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()

        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }

        try {
            const res = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const data = await res.json()
            localStorage.setItem("token", data.token)
            setErrorMessage(data.message)
        } catch(err) {
            setErrorMessage(err)
        }
    }

    useLayoutEffect(() => {
        fetch("http://localhost:8000/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? navigate("/home"): null)
        .catch(err => setErrorMessage(err)) 
    }, [navigate])

    return (
        <>
        <Headerlogreg />
        <div className="login-main">
        <div className="login-mai">
            <div className="loginlabel">Login</div>
            <form onSubmit={(e) => handleLogin(e)}>
              <input placeholder='Username' className="usernamelog" type="text" name="username" id="username" />
             <br />
                <input placeholder='Password' className="passwordlog" type="password" name="password" id="password" />
                <br />
                <input className="buttonlog" type="submit" value="Login"/>
                          
                </form>
            <div>
            {errorMessage === "Success" ? <Navigate to="/home"/>: <ValidationError message={errorMessage} />}
            </div>
          
            <div className="logother">
                <br/>
                    <h3>Don't have an account?</h3>
                    <Link className="registerbutton" to="/register" style={{textDecoration:"none", color:"#f8961e", fontWeight:"bolder"}}>Register here</Link>
                </div> 
                </div>
        </div>
        <Footer />

        </>
    )
}

export default Login;