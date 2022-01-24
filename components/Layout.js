import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <nav className="navigation shadow">
        <Link href="/">
          <a className="nav-link">Home</a>
        </Link>
        <Link href="/contact">
          <a className="nav-link">Contact</a>
        </Link>
        <Link href="/login">
          <a className="nav-link">Login</a>
        </Link>
      </nav>
      <div className="content-container">{children}</div>
    </>
  );
}