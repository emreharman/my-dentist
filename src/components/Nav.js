import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav>
        <div class="nav-wrapper container">
          <Link to="/" class="brand-logo right">
            My Dent
          </Link>
          <ul id="nav-mobile" class="left hide-on-med-and-down">
            <li>
              <Link to="/">Randevular</Link>
            </li>
            <li>
              <Link to="/hasta-islemleri">Hastalar</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
