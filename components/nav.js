import React from "react";
import Link from "next/link";

const Nav = props => (
  <nav>
    <ul>
      <Link href="/">
        <li key="nav-home">
          <a>Home</a>
        </li>
      </Link>
      <Link href="/blogs">
        <li key="nav-blogs">
          <a>Blogs</a>
        </li>
      </Link>
      <Link href="/about">
        <li key="nav-about">
          <a>About</a>
        </li>
      </Link>
    </ul>
    <style jsx>{`
      nav {
        position: fixed;
        text-align: center;
        padding: 1rem 3.5rem;
        width: 100%;
      }
      ul {
        // height: 70px;
        display: flex;
        justify-content: center;
        width: 100%;
        flex-direction: row;
        margin-bottom: 0;
      }
      li {
        margin: 0 50px;
        // display: flex;
        padding: 20px 40px;
        // border-right: 1px solid #ebebeb;
        // border-left: 1px solid #ebebeb;
        width: auto;
        border-radius: 42%;
        transition: all 0.1s;
        background: rgb(250, 250, 250);
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
        cursor: pointer;
        // padding: 22px 42px;
        background: rgb(148, 187, 233);
        border-radius: 48%;
        background: linear-gradient(
          0deg,
          rgba(148, 187, 233, 0.3267682072829131) 0%,
          rgba(238, 174, 202, 0.34637605042016806) 26%,
          rgba(250, 250, 250, 0.1783088235294118) 68%
        );
      }
    `}</style>
  </nav>
);

export default Nav;
