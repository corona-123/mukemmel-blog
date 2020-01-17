import React from "react";
import fetch from "isomorphic-unfetch";
import LayoutTop from "../components/LayoutTop";
import Blog from "../components/Blog";

const BlogPost = ({ post, props }) => (
  <div className="layout">
    <LayoutTop props={props}></LayoutTop>
    <div className="content-background container-fluid">
      <div className="content-container container">
        <Blog post={post}></Blog>
      </div>
    </div>
  </div>
);

BlogPost.getInitialProps = async ({ req, query }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const res = await fetch(`http://localhost:3000/api/post/${query.postId}`);
  const json = await res.json();
  const blogConfig = await import("../src/config.json");
  return { post: json.post, props: blogConfig };
};

export default BlogPost;
