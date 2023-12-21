// Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';  // Make sure to create a Header.scss file for styling

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo">
        <Link to="/">BEMath</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/bio">Biology</Link></li>
          <li><Link to="/eng">English</Link></li>
          <li><Link to="/math">Math</Link></li>
          {/* Add links for other sections as needed */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
