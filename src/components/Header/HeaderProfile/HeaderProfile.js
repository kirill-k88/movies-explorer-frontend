import { Link } from 'react-router-dom';
import './HeaderProfile.css';

function HeaderProfile() {
  return (
    <Link
      className="header__profile-button common-button"
      to="/profile"></Link>
  );
}

export default HeaderProfile;
