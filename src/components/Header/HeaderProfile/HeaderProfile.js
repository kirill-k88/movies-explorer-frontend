import { Link } from 'react-router-dom';
import './HeaderProfile.css';

function HeaderProfile() {
  return (
    <Link
      className="header__profile-button common-link"
      to="/signup"></Link>
  );
}

export default HeaderProfile;
