import React from "react";
import Link from "next/link";

const Nav = props => (
  <nav>
    <ul>
      <Link href="/">
        <li key="nav-home">Home</li>
      </Link>
      <Link href="/Blogs">
        <li key="nav-blogs">Blogs</li>
      </Link>
      <Link href="/Login">
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
        opacity: 0.5;
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
        border-radius: 28%;
        background: linear-gradient(
          0deg,
          rgba(148, 187, 233, 0.3267682072829131) 0%,
          rgba(238, 174, 202, 0.34637605042016806) 26%,
          rgba(250, 250, 250, 0.1783088235294118) 68%
        );
        box-shadow: 0 4px 8px 0 rgba(0, 140, 186, 0.5),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
        color: #022222;
        opacity: 1;
      }
    `}</style>
  </nav>
);

export default Nav;
