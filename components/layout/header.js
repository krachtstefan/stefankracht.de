import Link from 'next/link';
import React from 'react';
import Logo from './../../assets/images/logo.svg';

const Header = () => {
  return (
    <header>
      <Logo />
      {/* <nav>
        <Link href="/">
          <a>Blog</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/imprint">
          <a>imprint</a>
        </Link>
      </nav> */}
    </header>
  );
};

export default Header;
