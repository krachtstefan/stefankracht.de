import Link from 'next/link';
import React from 'react';
import Logo from './../../assets/images/logo.svg';

const Header = () => {
  return (
    <header>
      <Link href="/">
        <a id="logo">
          <Logo />
        </a>
      </Link>
      <nav>
        <Link href="/">
          <a className="active">Blog</a>
        </Link>
        <Link href="/imprint">
          <a>Projects</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
