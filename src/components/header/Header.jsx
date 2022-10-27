import React from 'react';
import bookLogo from '../../icons/bookLogo.png'

const Header = () => {
  return (
    <header className="App-header">
      <div className="sec-logo">
        <img src={bookLogo} className="App-logo" alt="logo" />
        <h3>My Reads</h3>
      </div>
    </header>
  );
}

export default Header