import "./style.css";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footerInfo">
        <h3>Created by: Mateo Ivanovich</h3>
        <h4>Mateoivanovich43@gmail.com</h4>
        <h5>+54 9 11 6548 0369</h5>
      </div>
      <div className="footerIcons">
        <Link to="https://www.instagram.com/mateoivanovich/"><img alt="instagram icon" src="/img/instagramIcon.png"/> </Link>
        <Link to="https://twitter.com/MateoIvanovich"><img alt="twitter icon" src="/img/twitterIcon.png" /></Link>
        <Link to="https://www.linkedin.com/in/mateo-ivanovich-232941227/" ><img alt="linkdin icon" src="/img/linkedinIcon.png" /></Link>
        
      </div>
    </footer>
  )
}

export default Footer;
