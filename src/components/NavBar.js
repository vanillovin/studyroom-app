import React from 'react';
import '../style/NavBar.css';
import { Link, NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <div>
      <nav>
        <div className="nav-container">
          <div className="home">
            <Link to="/">독서실</Link>
          </div>
          <ul>
            <li>
              <NavLink
                exact
                to="/seats"
                className="menu"
                activeClassName="active"
              >
                좌석현황
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/buy"
                className="menu"
                activeClassName="active"
              >
                이용권구매
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/mypage"
                className="menu"
                activeClassName="active"
              >
                마이페이지
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
