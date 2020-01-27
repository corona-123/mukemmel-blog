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
        uploadImage(image, docPath);
      })
      .then(() => {
        console.log("image uploaded");
      })
      .catch(err => console.log(err));
  }
  async function uploadImage(uri, postName) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    var ref = firebase
      .storage()
      .ref()
      .child(`posts/${postName}/photo`);
    return ref.put(blob);
  }

  return (
    <div className="layout">
      <LayoutTop></LayoutTop>
      {/* <div className="content-background container-fluid"> */}
      <div className="container create-post">
        <form class="form-horizontal" action="a">
          <div class="form-group file-field">
            <div class="btn btn-primary btn-sm waves-effect col-sm-2">
              <span>Choose file</span>
              <input type="file" />
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2" for="email">
              Title:
            </label>
            <div class="col-sm">
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Enter Title.."
                name="title"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2" for="pwd">
              Your Post:
            </label>
            <div class="col-sm">
              <textarea
                class="form-control"
                placeholder="Enter Post Description here..."
              />
            </div>
          </div>

          <div class="form-group submit-field">
            <div class="btn btn-primary btn-sm float-left waves-effect col-sm-2">
              <span>Submit</span>
              <button type="submit" className="submit-button" />
            </div>
          </div>
          {/* <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" name="remember" /> Remember me
                  </label>
                </div>
              </div>
            </div> */}
          {/* <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-default">
                  Submit
                </button>
              </div>
            </div> */}
        </form>
      </div>
      {/* </div> */}
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
