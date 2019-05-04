import Link from 'next/link';
import React, { Component } from 'react';
import Logo from './../../assets/images/logo.svg';

import ActiveLink from './../../components/misc/activeLink';
import { config } from '../../config';

export default class Header extends Component {
  componentDidMount() {
    document
      .querySelector('#logo')
      .addEventListener('mousemove', this.mouseMove);
  }

  mouseMove = e => {
    let { width: elemenWidth, height: elementHeigh } = document
      .querySelector('#logo')
      .getBoundingClientRect();
    let centerX = 0.5;
    let centerY = 0.5;
    let posX = e.offsetX / elemenWidth - centerX;
    let posY = e.offsetY / elementHeigh - centerY;
    console.log(posX, posY);
  };

  render() {
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
  }
}
