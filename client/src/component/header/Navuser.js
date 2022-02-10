import { useLayoutEffect, useState  } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import "./logoutBar.css";

function Navuser() {

    //experiment

    const navigate = useNavigate()
    const [username, setUsername] = useState(null)
    const [userup, setUserup] = useState(null)

    async function logout() {
        localStorage.removeItem("token")
        await navigate("/")
    }

    useLayoutEffect(() => {
        fetch("http://localhost:8000/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? setUsername(data.username) || setUserup(data.isAdmin): null)
        .catch(err => alert(err)) 
    }, [])


 

    
    console.log(userup)



    //ends here
    return (
        <>
        {/* addArticle checking */}
 
        {userup===true ?
        <div className='logoutBar'>
        <button ><Link to="/addarticle" className='AddArticle' style={{textDecoration:'none', color:'white', fontVariantCaps: 'titling-caps', fontWeight:'normal', fontSize:'20px', borderRadius:"10px", padding:"5px"}}>Add Article</Link></button>
       
        </div>
        :
        <div className='logoutBar'>
       

        </div>
        } 


        {/*  Username checking*/}

        {username ?
        <div className='logoutBar'>
        <h3>{username} </h3>  
        <button className='logoutb' onClick={logout}>Logout</button>
        </div>
        :
        <div className='logoutBar'>
        <h3>Guest </h3>  
        <button ><Link to="/" className='LinkFor' style={{textDecoration:'none'}}>Login</Link></button>

        </div>
        } 
        </>
    )
}

export default Navuser;