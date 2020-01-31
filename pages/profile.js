import React from "react";
import LayoutTop from "../components/LayoutTop";
import { firebase, auth, firestore } from "../src/firebase/index";
import withAuth from "../src/helpers/withAuth";
import "firebase/storage";
import "firebase/database";
import Loading from "../components/Loading";
import Profile from "../components/Profile";
import BlogListMini from "../components/BlogListMini";

class ProfileBlogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: true,
      sorted: null,
      searchAuthor: "Guest",
      commentCount: 0
    };
  }

  getCommentsCount = async () => {
    let count = this.state.commentCount;
    await firestore
      .collection("posts")
      .get()
      .then(doc => {
        doc.forEach(post => {
          post.data().comments.forEach(comment => {
            if (comment.commentor == this.state.searchAuthor) count++;
          });
        });
      })
      .catch(err => console.log(err))
      .then(() => {
        this.setState({ commentCount: count });
      });
  };

  getPosts = async () => {
    if (this.props.lookUp != undefined) {
      await this.setState({ searchAuthor: this.props.lookUp });
    } else {
      if (auth.currentUser != undefined && auth.currentUser != null) {
        if (!auth.currentUser.isAnonymous) {
          await this.setState({ searchAuthor: auth.currentUser.displayName });
        }
      }
    }
    await firestore
      .collection("posts")
      .where("author", "==", this.state.searchAuthor)
      .get()
      .then(doc => {
        if (doc != null) {
          doc.forEach(post => {
            let image = null;
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
    console.log(this.props.queryId);
    this.getPosts();
    this.getCommentsCount();
    this.setState({ isLoading: false });
  }
  render() {
    return this.state.isLoading ? (
      <Loading></Loading>
    ) : (
      <section>
        <LayoutTop></LayoutTop>
        <div className=" mt-5 mr-1 ml-1 border profile-background">
          <div className="container">
            <Profile User={this.state.searchAuthor}></Profile>
            <span className="display-4 white-background border">
              {this.state.searchAuthor}
            </span>
            <br></br>
            <div className="mt-4 row white-background border">
              <h5 className="mr-1">Posts: </h5>
              <h5 className=" mr-auto">
                {" "}
                <strong>{" " + this.state.posts.length}</strong>
              </h5>
              <h5 className="mr-1">Comments: </h5>
              <h5 className=" mr-auto">
                <strong>{" " + this.state.commentCount}</strong>
              </h5>
              <h5 className="mr-1">Last Posted On: </h5>
              <h5 className=" mr-0">
                <strong>
                  {this.state.posts.length != 0
                    ? this.state.posts[0].date
                    : "0"}
                </strong>
              </h5>
            </div>
          </div>
        </div>
        <div className="content-background container-fluid">
          {/* <span className="display-3">Posts:</span> */}
          <br></br>
          <BlogListMini posts={this.state.posts}></BlogListMini>
          {/* <div className="content-container container">
            <br></br>

            <BlogList posts={this.state.posts}></BlogList>
          </div> */}
        </div>
      </section>
    );
  }
}

ProfileBlogs.getInitialProps = async ({ req, query }) => {
  return { lookUp: query.anotherUser, queryId: query };
};

export default withAuth(ProfileBlogs);
