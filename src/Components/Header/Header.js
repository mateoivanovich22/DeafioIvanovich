import NavBar from "../NavBar/NavBar.js";
import SearchBarList from "../SearchBarList/SearchBarList.js";
import "./style.css";

const Header = () => {
  return (
    <header>
      <h1>Naike Clothes.</h1>
      <NavBar />
      <SearchBarList/>
    </header>
  );
};

export default Header;
