import React from "react";
import fetch from "isomorphic-unfetch";
import LayoutTop from "../components/LayoutTop";
import Blog from "../components/Blog";
import withAuth from "../src/helpers/withAuth";
import "firebase/database";
import "firebase";
import "firebase/storage";
import { firebase, auth, firestore } from "../src/firebase/index";

const BlogPost = ({ post, props }) => (
  <div className="layout">
    <LayoutTop></LayoutTop>
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
  return { post: json.post };
};

export default withAuth(BlogPost);
