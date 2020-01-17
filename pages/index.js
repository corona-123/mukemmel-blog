import React from "react";
import fetch from "isomorphic-unfetch";
import LayoutTop from "../components/LayoutTop";
import BlogList from "../components/BlogList";

const Home = ({ posts, props }) => (
  <div className="layout">
    <LayoutTop props={props} posts={posts}></LayoutTop>
    <div className="content-background container-fluid">
      <div className="content-container container">
        <BlogList posts={posts}></BlogList>
      </div>
    </div>
  </div>
);

Home.getInitialProps = async ({ req }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const res = await fetch("http://localhost:3000/api/posts");
  const json = await res.json();
  const blogConfig = await import("../src/config.json");
  return { posts: json.posts, props: blogConfig };
};

export default Home;
