import React from "react";
import fetch from "isomorphic-unfetch";
import BlogList from "../components/BlogList";
import LayoutTop from "../components/LayoutTop";
import withAuth from "../src/helpers/withAuth";
import { firebase, auth, firestore } from "../src/firebase/index";
import "firebase/storage";
import Router from "next/router";

class CreateBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "deneme title",
      details: "deneme details",
      image: "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}
  createPost = async () => {
    let authorName = "Guest";
    if (auth != null) {
      if (!auth.currentUser.isAnonymous)
        authorName = auth.currentUser.displayName;
    }
    let docPath = null;
    let res = await firestore
      .collection("posts")
      .add({
        title: this.state.title,
        date: firebase.firestore.Timestamp.now(),
        comments: [],
        author: authorName,
        details: this.state.details
      })
      .then(docRef => {
        docPath = docRef.id;
        console.log("Document successfully written! : ", docRef.id);
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      })
      .then(() => {
        var ref = firebase
          .storage()
          .ref()
          .child(`posts/${docPath}/photo.jpg`);
        ref.put(this.state.image);
      })
      .then(() => {
        console.log("image uploaded");
        Router.push("/");
      })
      .catch(err => {
        console.log(err);
        Router.push("/");
      });
  };
  // getBlob = async uri => {
  //   const blob = await new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = function() {
  //       resolve(xhr.response);
  //     };
  //     xhr.onerror = function() {
  //       reject(new TypeError("Network request failed"));
  //     };
  //     xhr.responseType = "blob";
  //     xhr.open("GET", uri, true);
  //     xhr.send(null);
  //   });
  //   return blob;
  // };
  render() {
    let img;
    if (
      this.state.image !=
      "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
    )
      img = URL.createObjectURL(this.state.image);
    else img = this.state.image;
    return (
      <div className="layout">
        <LayoutTop></LayoutTop>
        <div className="container create-post">
          <h1 className="display-1">
            <u>Create Blog : </u>
          </h1>
          <br></br>
          <form className="form-horizontal" action="a">
            <div className="form-group file-field">
              <div className="z-depth-1-half mb-4 col-sm text-center">
                <img
                  src={img}
                  className="img-fluid border border-dark"
                  alt="placeholder"
                />
              </div>
              <div className="w-100 text-center">
                <div className="btn btn-primary btn-sm waves-effect col-sm-2">
                  <span>Choose file</span>
                  <input
                    type="file"
                    onChange={e => {
                      console.log(e.target.files.item(0));
                      this.setState({
                        image: e.target.files.item(0)
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <h4 className="text-center mb-5">Choose a photo to upload!</h4>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="email">
                Title:
              </label>
              <div className="col-sm">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter Title.."
                  name="title"
                  onChange={text => {
                    this.setState({
                      title: text.target.value
                    });
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="pwd">
                Your Post:
              </label>
              <div className="col-sm">
                <textarea
                  className="form-control"
                  placeholder="Enter Post Description here..."
                  rows="6"
                  onChange={text => {
                    this.setState({
                      details: text.target.value
                    });
                  }}
                />
              </div>
            </div>

            <div className="form-group submit-field">
              <div className="btn btn-primary btn-sm float-left waves-effect col-sm-2">
                <span>Submit</span>
                <a className="submit-button" onClick={this.createPost}></a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CreateBlog.getInitialProps = async ({ req }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const res = await fetch(
    "http://dn-blog-sayfasi-ama-degil.herokuapp.com/api/posts"
  );
  const json = await res.json();

  return { posts: json.posts };
};

export default withAuth(CreateBlog);
