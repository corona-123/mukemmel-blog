import React from "react";
import fetch from "isomorphic-unfetch";
import LayoutTop from "../components/LayoutTop";
import Blog from "../components/Blog";
import withAuth from "../src/helpers/withAuth";
import "firebase/database";
import "firebase";
import "firebase/storage";
import { firebase, auth, firestore } from "../src/firebase/index";

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      date: "",
      comments: [],
      slug: "",
      hero_image: null,
      details: null
    };
  }

  componentDidMount = async () => {
    await firestore
      .collection("posts")
      .doc(this.props.postId)
      .get()
      .then(snapshot => {
        this.setState({
          title: snapshot.data().title,
          author: snapshot.data().author,
          date: new Date(
            (snapshot.data().date.seconds +
              snapshot.data().date.nanoseconds / 1000000000) *
              1000
          ).toDateString("dd/mm/yyyy"),
          comments: snapshot.data().comments,
          slug: snapshot.id
        });
      })
      .catch(err => console.log(err))
      .then(() => {
        let ref = firebase.storage().ref(`posts/${this.props.postId}`);
        ref
          .child("photo")
          .getDownloadURL()
          .then(photo => {
            this.setState({
              hero_image: photo
            });
          })
          .catch(err => {
            console.log(err);
            this.setState({
              hero_image:
                "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
            });
          });
        ref
          .child("photo")
          .getDownloadURL()
          .then(details => {
            this.setState({
              details: details
            });
          })
          .catch(err => {
            console.log(err);
            this.setState({
              details: "rr"
            });
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidUpdate() {
    // console.log(this.state);
  }

  render() {
    return (
      <div className="layout">
        <LayoutTop></LayoutTop>
        <div className="content-background container-fluid">
          <div className="content-container container">
            <Blog post={this.state}></Blog>
          </div>
        </div>
      </div>
    );
  }
}

BlogPost.getInitialProps = async ({ req, query }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const res = await fetch(`http://localhost:3000/api/post/${query.postId}`);
  // console.log(query.postId);
  return { postId: query.postId };
};

export default withAuth(BlogPost);
