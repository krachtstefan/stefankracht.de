import Link from 'next/link';
import React from 'react';
import Logo from './../../assets/images/logo.svg';

import ActiveLink from './../../components/misc/activeLink';
import { config } from '../../config';

const Header = () => {
  return (
    <header>
      <Link href="/">
        <a id="logo">
          <Logo />
        </a>
      </Link>
      <nav role="navigation" aria-label="Main navigation">
        <ActiveLink
          activeClassName="active"
          href={config.routing.blogList.nextLink.href(0)}
          as={config.routing.blogList.nextLink.as(0)}
          highlightOn={router =>
            router.pathname === config.routing.blogList.nextLink.href(0) ||
            router.pathname === '/post'
          }
        >
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
