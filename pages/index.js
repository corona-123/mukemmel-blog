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
      sorted: null,
      buffer: 5
    };
  }
  getPosts = async () => {
    await firestore
      .collection("posts")
      // .limit(this.state.buffer)
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
                let timestampToDate = new Date(
                  (post.data().date.seconds +
                    post.data().date.nanoseconds / 1000000000) *
                    1000
                );
                this.setState({
                  posts: [
                    ...this.state.posts,
                    {
                      title: post.data().title,
                      author: post.data().author,
                      date: `${timestampToDate.getDate()}/${parseInt(
                        timestampToDate.getMonth() + 1
                      )}/${timestampToDate.getFullYear()}`,
                      comments: post.data().comments,
                      slug: post.id,
                      hero_image: image,
                      details: post.data().details,
                      dateSorter:
                        (post.data().date.seconds +
                          post.data().date.nanoseconds / 1000000000) *
                        1000,
                      likes: post.data().likes,
                      views: post.data().views,
                      userID: post.data().userID
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
      .then(async () => {
        await firestore.collection("posts").onSnapshot(col => {
          col.docChanges().forEach(change => {
            let newPosts = this.state.posts.slice();
            newPosts[change.oldIndex] = {
              ...newPosts[change.oldIndex],
              title: change.doc.data().title,
              details: change.doc.data().details,
              comments: change.doc.data().comments,
              likes: change.doc.data().likes,
              views: change.doc.data().views
            };
            this.setState({
              posts: newPosts
            });
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
    console.log(this.state.buffer);
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
    window.addEventListener("scroll", this.listenToScroll);
    this.getPosts();
    this.setState({ isLoading: false });
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenToScroll);
  }
  listenToScroll = () => {
    const windowScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = windowScroll / height;
    if (scrolled > 0.95) {
      this.getPosts();
      this.setState({ buffer: this.state.buffer + 3 });
    }
  };
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
