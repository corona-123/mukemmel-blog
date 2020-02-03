import React from "react";
import Link from "next/link";
import LayoutTop from "../components/LayoutTop";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faHeart,
  faEye,
  faShareAlt,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";
// import Blog from "../components/Blog";
import Comment from "../components/Comment";
import Loading from "../components/Loading";
import "firebase/database";
import "firebase";
import "firebase/storage";
import { firebase, auth, firestore } from "../src/firebase/index";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from "react-share";

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
      details: "",
      likes: [],
      views: 0,
      commentText: "",
      commentor: "Guest",
      liked: false,
      favourite: false,
      showPopup: false,
      userID: 0,
      favouritesArray: []
    };
  }

  componentDidMount = async () => {
    await this.getFavourite;
    await firestore
      .collection("posts")
      .doc(this.props.postId)
      .get()
      .then(snapshot => {
        let timestampToDate = new Date(
          (snapshot.data().date.seconds +
            snapshot.data().date.nanoseconds / 1000000000) *
            1000
        );
        this.setState({
          title: snapshot.data().title,
          author: snapshot.data().author,
          date: `${timestampToDate.getDate()}/${parseInt(
            timestampToDate.getMonth() + 1
          )}/${timestampToDate.getFullYear()}`,
          comments: snapshot.data().comments,
          slug: snapshot.id,
          details: snapshot.data().details,
          likes: snapshot.data().likes,
          views: snapshot.data().views,
          liked: auth.currentUser.isAnonymous
            ? "nope"
            : snapshot
                .data()
                .likes.includes(
                  !auth.currentUser.isAnonymous ? auth.currentUser.uid : "nope"
                ),
          userID: snapshot.data().userID
        });
      })
      .catch(err => console.log(err))
      .then(async () => {
        let ref = await firebase.storage().ref(`posts/${this.props.postId}`);
        await ref
          .child("photo.jpg")
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
      })
      .catch(err => {
        console.log(err);
      })
      .then(async () => {
        let favouritesArr = [];
        if (!auth.currentUser.isAnonymous) {
          await firestore
            .collection("users")
            .doc(auth.currentUser.uid)
            .get()
            .then(user => {
              favouritesArr = user.data().favourites;
              let isFavourited = false;
              isFavourited = favouritesArr.includes(this.state.slug);
              this.setState({
                favouritesArray: favouritesArr,
                favourite: isFavourited
              });
            })
            .catch(err => console.log(err));
        }
      })
      .then(async () => {
        await firestore
          .collection("posts")
          .doc(this.props.postId)
          .set(
            {
              views: this.state.views + 1
            },
            { merge: true }
          );
      })
      .then(async () => {
        await firestore
          .collection("posts")
          .doc(this.props.postId)
          .onSnapshot(doc => {
            this.setState({
              comments: doc.data().comments,
              likes: doc.data().likes,
              views: doc.data().views
            });
          });
      })
      .catch(err => console.log());
  };
  componentDidUpdate() {}
  handleFavourite = async () => {
    let favouritesArr = this.state.favouritesArray;
    this.setState({ favourite: !this.state.favourite });

    let index = favouritesArr.indexOf(this.state.slug);
    if (this.state.favourite) {
      favouritesArr.splice(index, 1);
    } else {
      favouritesArr.push(this.state.slug);
    }
    await firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .set(
        {
          favourites: favouritesArr
        },
        { merge: true }
      )
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
  };
  handleSubmitComment = async () => {
    if (auth.currentUser != null && auth.currentUser != undefined) {
      if (!auth.currentUser.isAnonymous)
        this.setState({ commentor: auth.currentUser.displayName });
    }
    let commentsArr = [];
    let getPost = await firestore
      .collection("posts")
      .doc(this.state.slug)
      .get();
    commentsArr = getPost.data().comments;
    commentsArr.push({
      commentor: this.state.commentor,
      date: firebase.firestore.Timestamp.now(),
      message: this.state.commentText,
      commentorID: auth.currentUser.uid
    });
    await firestore
      .collection("posts")
      .doc(this.state.slug)
      .set(
        {
          comments: commentsArr
        },
        { merge: true }
      )
      .then(() => {
        this.setState({
          commentText: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleLike = async () => {
    this.setState({
      liked: !this.state.liked
    });
    let likesArr = [];
    let getPost = await firestore
      .collection("posts")
      .doc(this.state.slug)
      .get();
    likesArr = getPost.data().likes;
    if (likesArr.includes(auth.currentUser.uid)) {
      let index = likesArr.indexOf(auth.currentUser.uid);
      likesArr.splice(index, 1);
    } else {
      likesArr.push(auth.currentUser.uid);
    }
    await firestore
      .collection("posts")
      .doc(this.state.slug)
      .set(
        {
          likes: likesArr
        },
        { merge: true }
      )
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return auth.currentUser != undefined && auth.currentUser != null ? (
      <div className="layout">
        <LayoutTop></LayoutTop>
        <div
          className="container-fluid blog-picture mx-0 px-0"
          style={{ backgroundImage: "url(" + this.state.hero_image + ")" }}
        ></div>

        <div className="container py-5">
          <h1 className="display-4">{this.state.title}</h1>
          <ReactMarkdown className="lead" source={this.state.details} />
          <section className="blog-date-author justify-content-between">
            <section className="mt-4 blog-author-container">
              <span>Posted by : </span>
              <Link
                href={
                  auth.currentUser != null && auth.currentUser != undefined
                    ? auth.currentUser.uid == this.state.userID
                      ? "/profile"
                      : `/profile/${[this.state.userID]}`
                    : null
                }
              >
                <a className="text-center" href="/profile">
                  <span className="blog-author">{this.state.author}</span>
                </a>
              </Link>
            </section>

            <span className="mt-4">{this.state.date}</span>
          </section>
          <div className="container social-container justify-content-end row mx-0 px-5">
            <div className="right-social row float-right justify-content-between">
              <a
                className={`mr-2 h4${
                  auth.currentUser.isAnonymous ? " isDisabled" : ""
                }`}
                style={{ color: this.state.liked ? "#742f77" : "#aaa" }}
                onClick={this.handleLike}
              >
                {this.state.likes != undefined
                  ? this.state.likes.length
                  : 0 + " "}
                <FontAwesomeIcon icon={faHeart} width="35px"></FontAwesomeIcon>
              </a>
              <div className="mr-3 h4">
                {this.state.views + " "}
                <FontAwesomeIcon icon={faEye} width="35px"></FontAwesomeIcon>
              </div>
              <a
                className={`mr-4 h4${
                  auth.currentUser.isAnonymous ? " isDisabled" : ""
                }`}
                style={{ color: this.state.favourite ? "#742f77" : "#aaa" }}
                onClick={this.handleFavourite}
              >
                <FontAwesomeIcon
                  icon={faBookmark}
                  width="26px"
                ></FontAwesomeIcon>
              </a>
              {/* <section> */}
              <FacebookShareButton
                url={`http://dn-blog-sayfasi-ama-degil.herokuapp.com/${this.state.slug}`}
              >
                <FacebookIcon size={35} round={true}></FacebookIcon>
              </FacebookShareButton>
              <TwitterShareButton
                url={`http://dn-blog-sayfasi-ama-degil.herokuapp.com/${this.state.slug}`}
              >
                <TwitterIcon size={35} round={true}></TwitterIcon>
              </TwitterShareButton>
              <LinkedinShareButton
                url={`http://dn-blog-sayfasi-ama-degil.herokuapp.com/${this.state.slug}`}
              >
                <LinkedinIcon size={35} round={true}></LinkedinIcon>
              </LinkedinShareButton>
              <WhatsappShareButton
                url={`http://dn-blog-sayfasi-ama-degil.herokuapp.com/${this.state.slug}`}
              >
                <WhatsappIcon size={35} round={true}></WhatsappIcon>
              </WhatsappShareButton>
              {/* </section> */}
            </div>
          </div>
          <div className="mt-5 blog-bottom">
            {this.state.comments.map((comment, index) => (
              <Comment
                Comment={comment}
                key={comment.commentor + "_" + index}
              ></Comment>
            ))}
            <div className="media mt-3">
              <img
                className="d-flex rounded-circle avatar z-depth-1-half mr-3"
                src={
                  auth.currentUser != null && auth.currentUser != undefined
                    ? auth.currentUser.isAnonymous
                      ? "http://www.jdevoto.cl/web/wp-content/uploads/2018/04/default-user-img.jpg"
                      : auth.currentUser.photoURL
                    : null
                }
                alt="Generic placeholder image"
                height="100px"
              />
              <div className="media-body">
                <h5 className="mt-0 font-weight-bold blue-text">
                  {auth.currentUser != null && auth.currentUser != undefined
                    ? auth.currentUser.isAnonymous
                      ? "Guest"
                      : auth.currentUser.displayName
                    : null}
                </h5>
                <div className="form-group basic-textarea rounded-corners row ml-0 mr-0">
                  <textarea
                    className="form-control z-depth-1 col-sm"
                    id="Textarea"
                    rows="3"
                    placeholder={
                      auth.currentUser.isAnonymous
                        ? "You must sign in to write a comment!"
                        : "Write your comment..."
                    }
                    value={this.state.commentText}
                    onChange={text => {
                      this.setState({ commentText: text.target.value });
                    }}
                    disabled={auth.currentUser.isAnonymous ? true : false}
                  ></textarea>
                  <a
                    className={`btn-floating btn-primary rounded-circle send-comment-button
                    ${auth.currentUser.isAnonymous ? " isDisabled" : ""}`}
                    onClick={this.handleSubmitComment}
                  >
                    <FontAwesomeIcon
                      width="21px"
                      icon={faPaperPlane}
                    ></FontAwesomeIcon>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
      .blog-picture {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        height: 550px;
        width: 100%;
      }
      .social-container {
        color: #aaa;
      }
      .right-social {
        width: fit-content;
      }
      .right-social a {
        cursor pointer;
      }
    `}</style>
      </div>
    ) : (
      <Loading></Loading>
    );
  }
}

BlogPost.getInitialProps = async ({ req, query }) => {
  return { postId: query.postId };
};

export default BlogPost;
