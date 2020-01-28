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
        {/* <BlogList posts={posts}></BlogList> */}
      </div>
    </div>
  </div>
);

About.getInitialProps = async ({ req }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  // const res = await fetch(
  //   "http://dn-blog-sayfasi-ama-degil.herokuapp.com/api/posts"
  // );
  // const json = await res.json();
  return { posts: null };
};

export default withAuth(About);
