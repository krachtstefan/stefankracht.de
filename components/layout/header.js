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
          <a>Blog</a>
        </Link>
        <Link href="/about">
          <a className="active">About</a>
        </Link>
        <Link href="/imprint">
          <a>Imprint</a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
