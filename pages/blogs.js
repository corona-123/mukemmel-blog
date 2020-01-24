import React from "react";
import fetch from "isomorphic-unfetch";
import BlogList from "../components/BlogList";
import LayoutTop from "../components/LayoutTop";
import withAuth from "../src/helpers/withAuth";
import { firebase, auth, firestore } from "../src/firebase/index";

const Blogs = ({ posts, props }) => {
  // const file = require("/photo1");
  return (
    <div className="layout">
      <LayoutTop></LayoutTop>
      <div className="content-background container-fluid">
        <div className="content-container container">
          <BlogList posts={posts}></BlogList>
        </div>
      </div>
    </div>
  );
};

Blogs.getInitialProps = async ({ req }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const res = await fetch("http://localhost:3000/api/posts");
  const json = await res.json();
  const item = json.posts[0];
  console.log(item.hero_image);
  // console.log(file.toString());
  // let result = firestore
  //   .collection("posts")
  //   .doc(item.slug)
  //   .set({
  //     title: item.title,
  //     date: firebase.firestore.Timestamp.fromDate(new Date("December 5, 2019")),
  //     comments: []
  //   });

  // let ref = firebase
  //   .storage()
  //   .ref()
  //   .child("posts")
  //   .child(item.slug);
  // ref.put();
  return { posts: json.posts };
};

export default withAuth(Blogs);
