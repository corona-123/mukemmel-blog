import React from "react";
import LayoutTop from "../components/LayoutTop";
import { firebase, auth, firestore } from "../src/firebase/index";
import withAuth from "../src/helpers/withAuth";
import "firebase/storage";
import BlogList from "../components/BlogList";
import "firebase/database";
import Loading from "../components/Loading";

class ProfileBlogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: true,
      sorted: null,
      searchAuthor: "Guest"
    };
  }
  getPosts = async () => {
    if (auth.currentUser != undefined && auth.currentUser != null) {
      if (!auth.currentUser.isAnonymous)
        this.setState({ searchAuthor: auth.currentUser.displayName });
    }
    await firestore
      .collection("posts")
      .where("author", "==", this.state.searchAuthor)
      .get()
      .then(doc => {
        if (doc != null) {
          doc.forEach(post => {
            let image = null;
            let details = null;
            let ref = firebase.storage().ref(`posts/${post.id}`);
            ref
              .child("photo.jpg")
              .getDownloadURL()
              .then(photo => {
                image = photo;
              })
              .catch(err => {
                console.log("err");
                image =
                  "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg";
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
                      details: post.data().details,
                      dateSorter:
                        (post.data().date.seconds +
                          post.data().date.nanoseconds / 1000000000) *
                        1000
                    }
                  ],
                  sorted: false
                });
              });
          });
        }
      })
      .catch(err => console.log(err));
  };
  sortNumber(a, b) {
    return b - a;
  }
  componentDidUpdate() {
    if (!this.state.sorted) {
      this.sortPosts();
    }
  }
  sortPosts() {
    let posts = [];
    let postTimes = [];
    this.state.posts.forEach(post => postTimes.push(post.dateSorter));
    postTimes.sort(this.sortNumber);
    postTimes.forEach(time => {
      this.state.posts.forEach(post => {
        if (time == post.dateSorter) posts.push(post);
      });
    });
    this.setState({
      posts: posts,
      sorted: true
    });
  }
  componentDidMount() {
    this.getPosts();
    this.setState({ isLoading: false });
  }
  render() {
    return this.state.isLoading ? (
      <Loading></Loading>
    ) : (
      <div className="layout">
        <LayoutTop></LayoutTop>
        <div className="content-background container-fluid">
          <div className="content-container container">
            <h1 className="display-4 mt-5 text-center border">
              <u>You are signed in as:</u>
              <br></br>
              {this.state.searchAuthor}
            </h1>
            <BlogList posts={this.state.posts}></BlogList>
          </div>
        </div>
      </div>
    );
  }
}

ProfileBlogs.getInitialProps = async ({ req }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  // const res = await fetch(
  //   "http://dn-blog-sayfasi-ama-degil.herokuapp.com/api/posts"
  // );
  // const json = await res.json();

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

export default withAuth(ProfileBlogs);
