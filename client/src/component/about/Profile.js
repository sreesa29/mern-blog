import { useEffect, useState  } from 'react';
import Header from "../header/Header"
import Footer from '../login/Footer';



function Profile() {

    //experiment
    const [users, setUsers]=useState([]);

    useEffect(() => {
        fetchData();
        }, []);

    async function fetchData() {
        const response = await fetch(`/profile`,{
            headers: {
                "x-access-token": localStorage.getItem("token")
                }

        });
        console.log(`1. ${response}`)
        const body = await response.json();
        console.log(`2. ${body}`);
        setUsers(body);
    }



   //ends here
    return (
        <>
        <Header />
    
        {users.username ?
        <div className='logoutBar'>
            
            
      <h3>Name: {users.name} </h3> 
        <br />
        <h3>Gender: {users.gender} </h3> 
        <br />
        <h3>email: {users.email} </h3>
        <br />
        <h3>Username: {users.username} </h3>
        <br />
        {users.pfp}
        

        {
            users.isAdmin===true ?
            <h3>Role: Admin</h3> :
            <h3>Role: User</h3>
        }
        <br />
        <h3>Articles</h3>
                       
        </div>
        :
        <div className='logoutBar'>
            <p style={{color:"rgb(255, 208, 0)", fontSize:"56px", padding:"35px"}} >You're Guest! You've No Profile</p>
        

        </div>
        }  
                <Footer/>

        </>
    )
}

export default Profile;