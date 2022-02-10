import { useLayoutEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import ValidationError from './ValidationError'
import "./register.css"
import Headerlogreg from '../header/Headerlogreg'
import Footer from './Footer'

function Register () {

    const [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault()

        const form = e.target
        const user = {
            username: form[0].value,
            email: form[1].value,
            name: form[2].value,
            gender: form[3].value,
            password: form[4].value
        }
        

        try {
            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const data = await res.json()
            setErrorMessage(data.message)
        } catch (err) {
            setErrorMessage(err)
        }
    }

    useLayoutEffect(() => {
        fetch("/isUserAuth", {
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
        <div className="regma1">
        <div className="regmain">
            <div className="regtitle">Register</div>
            <form onSubmit={(e) => handleRegister(e)}>
               
                <input placeholder='Username' className='uname' type="text" name="username" id="username" required/>
               <br />
                <input placeholder='Mail Address' className='umail' type="email" name="email" id="email" required />
                <br />
                <input placeholder='Full Name' className='fname' type="text" name="name" id="name" required />
                <br />
                <input placeholder='Gender' className='gender' type="text" name="gender" id="gender" required/>
                <br />
                <input placeholder='Password' className='password' name="password" type="password" required/>
                <br />
                <input type="submit" className='regbutton' value="Register" />
                <br />
                <div>{errorMessage === "Success" ? <Navigate to="/"/>: <ValidationError message={errorMessage} />}</div>
                <div className="logotherss">
                    <br />
                    <p>Already have an account?</p>
                    <Link to="/"  style={{textDecoration:"none", color:"#f8961e", fontWeight:"bolder"}}>Login</Link>
                </div>
            </form>
        </div>
        </div>
        <Footer />
        </>
    )
}
export default Register