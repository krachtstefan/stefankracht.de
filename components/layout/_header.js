import ActiveLink from './../../components/misc/active-link';
import Link from 'next/link';
import Logo from './../../assets/images/logo.svg';
import React from 'react';
import { config } from '../../config';
import dynamic from 'next/dynamic';
const LogoAnimation = dynamic(
  () => import('../../components/misc/logo-animation'),
  { ssr: false }
);

const Header = () => (
  <header>
    <LogoAnimation selector={'#logo'} />
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
        highlightOn={(router) =>
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

export default Header;
