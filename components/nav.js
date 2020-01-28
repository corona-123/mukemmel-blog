import React from "react";
import Link from "next/link";

const Nav = () => (
  <nav>
    <ul>
      <Link href="/">
        <li key="nav-Blogs">Blogs</li>
      </Link>
      <Link href="/createBlog">
        <li key="nav-create-blog">Create Blog</li>
      </Link>
      <Link href="/profile">
        <li key="nav-about">Profile</li>
      </Link>
    </ul>
    <style jsx>{`
      nav {
        position: fixed;
        text-align: center;
        padding: 1rem 3.5rem;
        width: 100%;
        z-index: 100;
      }
      ul {
        display: flex;
        justify-content: center;
        width: 100%;
        flex-direction: row;
        margin-bottom: 0;
      }
      li {
        margin: 0 50px;
        padding: 15px 20px;
        border-radius: 20%;
        transition: all 0.3s;
        background: rgb(250, 250, 250);
        color: #067df7;
        text-decoration: none;
        font-size: 21px;
        opacity: 0.9;
        border: 1px solid #cccccc;
      }
      nav a {
        color: #067df7;
        text-decoration: none;
        font-size: 21px;
        transition: all 0.3s;
      }
      nav a:hover {
        cursor: pointer;
        color: #022222;
      }
      li:hover {
        opacity: 1;
        cursor: pointer;
        background: rgb(148, 187, 233);
        border-radius: 28%;
        // background: linear-gradient(
        //   0deg,
        //   rgba(148, 187, 233, 0.3267682072829131) 0%,
        //   rgba(238, 174, 202, 0.34637605042016806) 26%,
        //   rgba(250, 250, 250, 0.1783088235294118) 68%
        // );
        box-shadow: 0 4px 8px 0 rgba(0, 140, 186, 0.5),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
        color: #022222;
      }
    `}</style>
  </nav>
);

export default Nav;
