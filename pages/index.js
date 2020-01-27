import React from "react";
import fetch from "isomorphic-unfetch";
import LayoutTop from "../components/LayoutTop";
import { firebase, auth, firestore } from "../src/firebase/index";
import withAuth from "../src/helpers/withAuth";
import "firebase/storage";
import BlogList from "../components/BlogList";
import "firebase/database";
import "firebase";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  getPosts = async () => {
    await firestore
      .collection("posts")
      .limit(5)
      .get()
      .then(doc => {
        if (doc != null) {
          doc.forEach(post => {
            let image = null;
            let details = null;
            let ref = firebase.storage().ref(`posts/${post.slug}`);
            ref
              .child("photo")
              .getDownloadURL()
              .then(photo => {
                image = photo;
              })
              .catch(err => {
                console.log(err);
                image =
                  "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg";
              })
              .then(() => {
                ref
                  .child("details")
                  .getDownloadURL()
                  .then(detail => {
                    details = detail;
                  })
                  .catch(err => {
                    details = "./posts/ornek-yazi.md";
                    console.log(err);
                  })
                  .then(() => {
                    this.setState({
                      posts: [
                        ...this.state.posts,
                        {
                          title: post.data().title,
                          author: post.data().author,
                          date: new Date(
                            (post.data().date.seconds +
                              post.data().date.nanoseconds / 1000000000) *
                              1000
                          ).toDateString("dd/mm/yyyy"),
                          comments: post.data().comments,
                          slug: post.id,
                          hero_image: image,
                          details: details
                        }
                      ]
                    });
                  });
              });
          });
        }
      })
      .catch(err => console.log(err));
  };
  componentDidUpdate() {}
  componentDidMount() {
    this.getPosts();
  }
  render() {
    return (
      <div className="layout">
        <LayoutTop></LayoutTop>
        <div className="content-background container-fluid">
          <div className="content-container container">
            {/* <img src={}></img> */}
            <BlogList posts={this.state.posts}></BlogList>
            {/* {console.log(this.state.posts)} */}
          </div>
        </div>
      </div>
    );
  }
}

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
  // console.log(json.posts);
  return { posts: null };
};

export default withAuth(Home);
