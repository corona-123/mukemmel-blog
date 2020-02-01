import React from "react";
import LayoutTop from "../components/LayoutTop";
import { firebase, auth, firestore } from "../src/firebase/index";
import withAuth from "../src/helpers/withAuth";
import "firebase/storage";
import "firebase/database";
import Loading from "../components/Loading";
import Profile from "../components/Profile";
import BlogListMini from "../components/BlogListMini";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faBookmark,
  faPlusCircle
} from "@fortawesome/fontawesome-free-solid";
import Link from "next/link";

class ProfileBlogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: true,
      sorted: null,
      userID: 0,
      profileName: "",
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
            if (comment.commentorID == this.state.userID) count++;
          });
        });
      })
      .catch(err => console.log(err))
      .then(() => {
        this.setState({ commentCount: count });
      });
  };

  getPosts = async () => {
    // if (this.props.lookUp != undefined) {
    //   await this.setState({ userID: this.props.lookUp });
    // } else {
    //   if (auth.currentUser != undefined && auth.currentUser != null) {
    //     if (!auth.currentUser.isAnonymous) {
    //       await this.setState({ userID: auth.currentUser.uid });
    //     }
    //   }
    // }
    await this.setState({
      userID: auth.currentUser.uid,
      profileName: auth.currentUser.displayName
    });
    await firestore
      .collection("posts")
      .where("userID", "==", this.state.userID)
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
                        1000,
                      userID: post.data().userID
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
    this.getCommentsCount();
    this.setState({ isLoading: false });
  }
  render() {
    // let profileInputComponent = (
    //   <input
    //     id="input-profile"
    //     type="file"
    //     onChange={e => {
    //       if (
    //         e.target.files.item(0).type != "image/jpeg" &&
    //         e.target.files.item(0).type != "image/png" &&
    //         e.target.files.item(0).type != "image/gif" &&
    //         e.target.files.item(0) != "image/webp"
    //       ) {
    //         alert("You can only upload: GIF/JPEG/JPG/PNG/WEBP !");
    //       } else {
    //         this.setState({
    //           image: e.target.files.item(0)
    //         });
    //       }
    //     }}
    //     accept="image/*"
    //   />
    // );
    return this.state.isLoading ? (
      <Loading></Loading>
    ) : (
      <section>
        <LayoutTop></LayoutTop>
        <div className=" mt-5 mr-1 ml-1 border profile-background">
          <div className="container">
            {/* {profileInputComponent} */}
            <Profile User={this.state.profileName}></Profile>
            <span className="display-4 white-background border">
              {this.state.profileName}
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
        <div className="container-fluid">
          <br></br>
          <div className="text-center row justify-content-md-center">
            <Link href="/favourites">
              <a className="text-center link-black mx-1 col-sm-2">
                <FontAwesomeIcon
                  icon={faBookmark}
                  width="35px"
                ></FontAwesomeIcon>
                <h4>Favourites</h4>
              </a>
            </Link>
            <Link href="/createBlog">
              <a className="text-center link-black mx-1 col-sm-2">
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  width="35px"
                ></FontAwesomeIcon>
                <h4>Create Blog</h4>
              </a>
            </Link>
            <Link href="/createBlog">
              <a className="text-center link-black mx-1 col-sm-2">
                <FontAwesomeIcon
                  icon={faBookmark}
                  width="35px"
                ></FontAwesomeIcon>
                <h4>Favourites</h4>
              </a>
            </Link>
          </div>
          <br></br>
          <BlogListMini posts={this.state.posts}></BlogListMini>
        </div>
      </section>
    );
  }
}

ProfileBlogs.getInitialProps = async ({ req, query }) => {
  return { lookUp: query.anotherUser, queryId: query };
};

export default withAuth(ProfileBlogs);
