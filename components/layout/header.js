import Link from 'next/link';
export default ({ user = {} }) => (
  <header>
    <nav>
      <Link href="/">
        <a>Blog</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/imprint">
        <a>imprint</a>
      </Link>
    </nav>
  </header>
);
