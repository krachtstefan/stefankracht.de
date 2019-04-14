import ActiveLink from './../../components/misc/activeLink';
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
        <ActiveLink activeClassName="active" href="/blog">
          <a>Blog</a>
        </ActiveLink>
        <ActiveLink activeClassName="active" href="/projects">
          <a>Projects</a>
        </ActiveLink>
        <ActiveLink activeClassName="active" href="/about">
          <a>About</a>
        </ActiveLink>
      </nav>
    </header>
  );
};

export default Header;
