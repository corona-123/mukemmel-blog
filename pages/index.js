import React from "react";
import LayoutTop from "../components/LayoutTop";
import { firebase, auth, firestore } from "../src/firebase/index";
import withAuth from "../src/helpers/withAuth";
import "firebase/storage";
import BlogList from "../components/BlogList";
import "firebase/database";
import Loading from "../components/Loading";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: true,
      sorted: null
    };
  }
  getPosts = async () => {
    await firestore
      .collection("posts")
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
                console.log(err);
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
              })
              .catch(err => console.log(err));
          });
        }
      })
      .catch(err => console.log(err))
      .then(() => {
        firestore.collection("posts").onSnapshot(col => {
          // this.setState({
          //   posts: doc.
          // });
          // console.log(this.state.posts.find(x => x.title == "1"));
          col.docChanges().forEach(change => {
            if (change.type == "modified") {
              let newPosts = this.state.posts.slice();
              newPosts[change.oldIndex - 1] = {
                ...newPosts[change.oldIndex - 1],
                title: change.doc.data().title,
                details: change.doc.data().details,
                comments: change.doc.data().comments
              };
              this.setState({
                posts: newPosts
              });
            }
          });
        });
      });
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
    return this.state.isLoading ||
      auth.currentUser == null ||
      auth.currentUser == undefined ? (
      <Loading></Loading>
    ) : (
      <div className="layout">
        <LayoutTop></LayoutTop>
        <div className="content-container container">
          <BlogList posts={this.state.posts}></BlogList>
        </div>
      </div>
    );
  }
}

export default Home;
