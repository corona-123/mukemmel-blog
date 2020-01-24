import React from "react";
import fetch from "isomorphic-unfetch";
import LayoutTop from "../components/LayoutTop";
import { firebase, auth, firestore } from "../src/firebase/index";
import withAuth from "../src/helpers/withAuth";

const Home = ({ posts, props }) => {
  return (
    <div className="layout">
      <LayoutTop posts={posts}></LayoutTop>
      <div className="content-background container-fluid">
        <div className="content-container container">
          {/* <BlogList posts={posts}></BlogList> */}
          Kişisel blog sayfasından daha çok herkes için açık ve blog yazılabilen
          bir platform oldu bu...
        </div>
      </div>
    </div>
  );
};

Home.getInitialProps = async ({ req }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const res = await fetch("http://localhost:3000/api/posts");
  const json = await res.json();
  // let result = firestore
  //   .collection("users")
  //   .limit(10)
  //   .get()
  //   .then(snapshot => {
  //     snapshot.forEach(doc => {
  //       console.log(doc.id);
  //     });
  //   });
  return { posts: json.posts };
};

export default withAuth(Home);
