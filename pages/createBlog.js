import React from "react";
import fetch from "isomorphic-unfetch";
import BlogList from "../components/BlogList";
import LayoutTop from "../components/LayoutTop";
import withAuth from "../src/helpers/withAuth";
import { firebase, auth, firestore } from "../src/firebase/index";
import "firebase/storage";

const CreateBlog = () => {
  let title = "deneme title";
  let details = "deneme details";
  // let image = new File();
  // image = "/photo1.jpg";
  async function createPost() {
    let authorName = "Guest";
    if (auth != null) {
      if (!auth.currentUser.isAnonymous)
        authorName = auth.currentUser.displayName;
    }
    let docPath = null;
    await firestore
      .collection("posts")
      .add({
        title: title,
        date: firebase.firestore.Timestamp.now(),
        comments: [],
        author: authorName
      })
      .then(docRef => {
        docPatch = docRef.id;
        console.log("Document successfully written! : ", docRef.id);
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      })
      .then(() => {
        let ref = firebase.storage().ref(`/posts/${docPath}`);
        // ref.put(image);
      })
      .then(() => {
        console.log("image uploaded");
      })
      .catch(err => console.log(err));
  }
  return (
    <div className="layout">
      <LayoutTop></LayoutTop>
      <div className="content-background container-fluid">
        <div className="content-container container">
          {/* <BlogList posts={posts}></BlogList> */}
          <button onClick={createPost}>deneme</button>
        </div>
      </div>
    </div>
  );
};

CreateBlog.getInitialProps = async ({ req }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const res = await fetch("http://localhost:3000/api/posts");
  const json = await res.json();

  return { posts: json.posts };
};

export default withAuth(CreateBlog);
