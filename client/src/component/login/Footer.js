import React from 'react';
import "./footer.css";
import {FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaGithub} from "react-icons/fa";
import { Link } from 'react-router-dom';


function Footer(props) {
    return (
   <footer>
<div className="row primary">
  <div className="column about">

  <h2 className='footertitle' style={{color:"#f8961e"}}>\Binge Blog\</h2>

   <p style={{color:"white"}}>
   The Binge Blog app allows you to post, edit, save, and view your posts about movies/series. Create new account and start to binge blog! <br />Designed for Academic purpose. #03 ICATK Assignment.


  </p>
  <div className="social">
    <i className="fa-brands"><FaFacebookF /></i>
    <i className="fa-brands"><FaTwitter /></i>
    <i className="fa-brands"><FaInstagram /></i>
    <i className="fa-brands"><FaYoutube /></i>
    <i className="fa-brands"><FaGithub /></i>
  </div>
</div>

<div className="column links">
<h3 style={{color:"rgb(255, 208, 0)"}} >Links</h3>

 <ul>

  <li>
   <Link to="#faq">FAQ</Link>
  </li>
  <li>
   <Link to="#cookies-policy">Cookies Policy</Link>
  </li>
  <li>
   <Link to="#terms-of-services">Terms Of Service</Link>
  </li>
  <li>
   <Link to="#support">Support</Link>
  </li>
 </ul>

</div>


<div className="column links">
  <h3 className='h3' style={{color:"rgb(255, 208, 0)"}} > External Links</h3>
   <ul>
    <li>     <Link to="#faq">IMDB</Link>   </li>
    <li>     <Link to="#cookies-policy">Rotten Tomatoes</Link>   </li>
    <li>     <Link to="#terms-of-services">Metacritics</Link>   </li>
    <li>     <Link to="#support">LetterBoxd</Link>
    </li>
  </ul>
</div>

<div className="column subscribe">
<h2 className='footertitle' style={{color:"#f8961e"}}>Disclaimer</h2>
<p style={{color:"white"}}>This is a personal blog. All content provided (Especially Blog Articles) on this blog is for Academic purpose. The owner of this blog makes no representation as to the accuracy of complete was of any information on this site or found by following any link on this information. The owner will not liable for any losses or damages from the display or use of this information. 
 </p>
 <h5 style={{color:"rgb(255, 208, 0)"}} >Sree Sankar</h5>
</div>


</div>

<div className="row copyright">
   <p>Copyright &copy; 2022 ~Sree</p>
</div>
</footer>
    );
}

export default Footer;