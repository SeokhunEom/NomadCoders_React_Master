import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

function Layout({ children, title }: LayoutProps) {
  return (
    <main className="container">
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about-us">About Us</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
        </ul>
      </nav>
      <h1>{title}</h1>
      {children}
    </main>
  );
}

export default Layout;
