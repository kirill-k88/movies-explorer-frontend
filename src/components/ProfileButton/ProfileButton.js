import { Link } from 'react-router-dom';
import './ProfileButton.css';

function ProfileButton({ clickHandler }) {
  return (
    <Link className="profile-button common-button" to="/profile" onClick={clickHandler}></Link>
  );
}

export default ProfileButton;
