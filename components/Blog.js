import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Comment from "./Comment";
import { auth, firestore, firebase } from "../src/firebase/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import React from "react";

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: "",
      commentor: "Guest"
    };
  }
  componentDidMount() {
    console.log(this.props.post);
  }
  // let commentText = "";
  // let commentor = "Guest";
  handleSubmitComment = async () => {
    if (auth.currentUser != null && auth.currentUser != undefined) {
      if (!auth.currentUser.isAnonymous)
        commentor = auth.currentUser.displayName;
    }
    let commentsArr = [];
    let getPost = await firestore
      .collection("posts")
      .doc(this.props.post.slug)
      .get();
    commentsArr = getPost.data().comments;
    commentsArr.push({
      commentor: this.state.commentor,
      date: firebase.firestore.Timestamp.now(),
      message: this.state.commentText
    });
    await firestore
      .collection("posts")
      .doc(this.props.post.slug)
      .set(
        {
          comments: commentsArr
        },
        { merge: true }
      )
      .then(() => {
        alert("Comment sent...");
        // if (Router.route == "/" || Router.route == "/profile")
        //   Router.push(`/${post.slug}`);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="blog">
        <Link href={this.props.post.slug}>
          <img
            src={this.props.post.hero_image}
            alt={this.props.post.hero_image}
            className="blog-image"
          ></img>
        </Link>
        <h2 className="blog-title">
          <Link href={this.props.post.slug}>
            <a className="blog-title-link">{this.props.post.title}</a>
          </Link>
        </h2>
        <div className="blog-text">
          <ReactMarkdown source={this.props.post.details} />
        </div>
        <div className="blog-date-author justify-content-between">
          <div className="blog-author-container">
            <span>Posted by : </span>
            <span className="blog-author">{this.props.post.author}</span>
          </div>
          <span>{this.props.post.date}</span>
        </div>
        <div className="blog-bottom">
          {this.props.caller == "bloglist" ? (
            this.props.post.comments[0] == undefined ? (
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
            ) : (
              <section>
                {/* add SHOW MORE icon and implement logic */}
                {this.props.post.comments.length > 2 ? (
                  <div>daha fazla</div>
                ) : null}
                {this.props.post.comments.length > 1 ? (
                  <Comment
                    Comment={
                      this.props.post.comments[
                        this.props.post.comments.length - 2
                      ]
                    }
                    key={
                      this.props.post.comments[
                        this.props.post.comments.length - 1
                      ] + Date.now()
                    }
                  ></Comment>
                ) : null}
                <Comment
                  Comment={
                    this.props.post.comments[
                      this.props.post.comments.length - 1
                    ]
                  }
                  key={
                    this.props.post.comments[
                      this.props.post.comments.length - 1
                    ]
                  }
                ></Comment>
                {/* {post.comments.map((comment, index) => {
                console.log(index);
                <Comment
                  Comment={post.comments[post.comments.length - index + 1]}
                  key={post.comments[post.comments.length - index + 1]}
                ></Comment>;
              })} */}
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
              </section>
            )
          ) : (
            <section>
              {this.props.post.comments.map((comment, index) => (
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
            </section>
          )}
        </div>
      </div>
    );
  }
}

Blog.getInitialProps = async ({ post, caller }) => {
  return { post: post, caller: caller };
};

export default Blog;
