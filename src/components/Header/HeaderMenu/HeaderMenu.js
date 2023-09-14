import './HeaderMenu.css';

function HeaderMenu({ headerMenuButtonHandler }) {
  return (
    <button
      className="header__menu-button common-button"
      type="button"
      onClick={headerMenuButtonHandler}
    ></button>
  );
}

export default HeaderMenu;
