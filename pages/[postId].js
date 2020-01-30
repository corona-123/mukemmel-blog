import React from "react";
import Link from "next/link";
import LayoutTop from "../components/LayoutTop";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faHeart,
  faEye,
  faShareAlt
} from "@fortawesome/free-solid-svg-icons";
// import Blog from "../components/Blog";
import Comment from "../components/Comment";
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
      details: "",
      commentText: "",
      commentor: "Guest"
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
          slug: snapshot.id,
          details: snapshot.data().details
        });
      })
      .catch(err => console.log(err))
      .then(() => {
        let ref = firebase.storage().ref(`posts/${this.props.postId}`);
        ref
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
      .then(() => {
        firestore
          .collection("posts")
          .doc(this.props.postId)
          .onSnapshot(doc => {
            this.setState({
              comments: doc.data().comments
            });
          });
      });
  };
  componentDidUpdate() {}
  handleSubmitComment = async () => {
    if (auth.currentUser != null && auth.currentUser != undefined) {
      if (!auth.currentUser.isAnonymous)
        this.state.commentor = auth.currentUser.displayName;
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
      message: this.state.commentText
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
        alert("Comment sent...");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
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
                  auth.currentUser.displayName == this.state.author
                    ? "/profile"
                    : `/profile/${[this.state.author]}`
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
            <div className="right-social row float-right justify-content-around">
              <a className="h4">
                0{" "}
                <FontAwesomeIcon icon={faHeart} width="35px"></FontAwesomeIcon>
              </a>
              <a className="h4">
                0 <FontAwesomeIcon icon={faEye} width="35px"></FontAwesomeIcon>
              </a>
              <a>
                <FontAwesomeIcon
                  icon={faShareAlt}
                  width="35px"
                ></FontAwesomeIcon>
              </a>
            </div>
          </div>
          <div className="blog-bottom">
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
                  auth.currentUser.isAnonymous
                    ? "http://www.jdevoto.cl/web/wp-content/uploads/2018/04/default-user-img.jpg"
                    : auth.currentUser.photoURL
                }
                alt="Generic placeholder image"
                height="100px"
              />
              <div className="media-body">
                <h5 className="mt-0 font-weight-bold blue-text">
                  {auth.currentUser.isAnonymous
                    ? "Guest"
                    : auth.currentUser.displayName}
                </h5>
                <div className="form-group basic-textarea rounded-corners row ml-0 mr-0">
                  <textarea
                    className="form-control z-depth-1 col-sm"
                    id="Textarea"
                    rows="3"
                    placeholder="Write your comment..."
                    value={this.state.commentText}
                    onChange={text => {
                      this.setState({ commentText: text.target.value });
                    }}
                  ></textarea>
                  <a
                    className="btn-floating btn-primary rounded-circle send-comment-button"
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
            height: 400px;
            width: 100%;
          }
          .social-container {
            color: #aaa;
          }
          .right-social {
            width: 20%;
          }
        `}</style>
      </div>
    );
  }
}

BlogPost.getInitialProps = async ({ req, query }) => {
  return { postId: query.postId };
};

export default withAuth(BlogPost);
