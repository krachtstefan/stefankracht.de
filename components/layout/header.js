import Link from 'next/link';
import React from 'react';
import Logo from './../../assets/images/logo.svg';

const Header = () => {
  return (
    <header>
      <Link href="/">
        <a>
          <Logo id="logo" />
        </a>
      </Link>
      <nav>
        <Link href="/">
          <a>Blog</a>
        </Link>
        <br />
        <Link href="/about">
          <a>About</a>
        </Link>
        <br />
        <Link href="/imprint">
          <a>Imprint</a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
