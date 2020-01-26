import React from "react";
import fetch from "isomorphic-unfetch";
import BlogList from "../components/BlogList";
import LayoutTop from "../components/LayoutTop";
import withAuth from "../src/helpers/withAuth";

const About = ({ posts }) => (
  <div className="layout">
    <LayoutTop></LayoutTop>
    <div className="content-background container-fluid">
      <div className="content-container container">
        <BlogList posts={posts}></BlogList>
      </div>
    </div>
  </div>
);

About.getInitialProps = async ({ req }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const res = await fetch("http://localhost:3000/api/posts");
  const json = await res.json();
  return { posts: json.posts };
};

export default withAuth(About);
