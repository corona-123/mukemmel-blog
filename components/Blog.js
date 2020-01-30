import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Comment from "./Comment";
import { auth, firestore, firebase } from "../src/firebase/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faChevronCircleDown
} from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import React from "react";
import Loading from "./Loading";

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: "",
      commentor: "Guest",
      showOrHideComment: false,
      showOrHideDetails: false,
      isLoading: true
    };
  }
  componentDidMount() {
    this.setState({ isLoading: false });
  }
  handleSubmitComment = async () => {
    if (auth.currentUser != null && auth.currentUser != undefined) {
      if (!auth.currentUser.isAnonymous)
        this.state.commentor = auth.currentUser.displayName;
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
    let enterCommentComponent = (
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
    );
    let component = this.state.isLoading ? (
      //Loading
      <Loading></Loading>
    ) : (
      //Loaded
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
          <ReactMarkdown
            className={
              this.props.caller != "postId" && !this.state.showOrHideDetails
                ? "span"
                : ""
            }
            source={this.props.post.details}
          />
          {this.props.caller != "postId" ? (
            <a
              className="read-more"
              onClick={() => {
                console.log("asdasd");
                this.setState({
                  showOrHideDetails: !this.state.showOrHideDetails
                });
              }}
            >
              <strong>
                {this.state.showOrHideDetails ? "Hide Details!" : "Read More!"}
              </strong>
            </a>
          ) : null}
        </div>
        <div className="blog-date-author justify-content-between">
          <div className="blog-author-container">
            <span>Posted by : </span>
            <Link
              href={{
                pathname: "/profile",
                query: { anotherUser: this.props.post.author }
              }}
              as={`/profile/${this.props.post.author}`}
            >
              <a className="text-center" href="/profile">
                <span className="blog-author">{this.props.post.author}</span>
              </a>
            </Link>
          </div>
          <span>{this.props.post.date}</span>
        </div>
        <div className="blog-bottom">
          {this.props.caller == "bloglist" ? (
            //if caller bloglist
            this.props.post.comments[0] == undefined ? (
              //if caller bloglist and there are no comments
              enterCommentComponent
            ) : (
              //if caller bloglist and there are comments
              <section>
                {this.props.post.comments.length > 2 ? (
                  //if caller bloglist and there are comments more than 2 SHOW HIDE
                  <div className="text-center">
                    <a
                      className="comment-dropdown"
                      onClick={() =>
                        this.setState({
                          showOrHideComment: !this.state.showOrHideComment
                        })
                      }
                    >
                      <FontAwesomeIcon
                        width="21px"
                        icon={faChevronCircleDown}
                        className={
                          !this.state.showOrHideComment
                            ? "comment-dropdown-icon-up"
                            : "comment-dropdown-icon-down" + " " + "mr-2"
                        }
                      ></FontAwesomeIcon>
                      {!this.state.showOrHideComment
                        ? "Show more comments!"
                        : "Hide comments!"}
                    </a>
                  </div>
                ) : //if caller bloglist and there are comments !not more than 2 SHOW HIDE
                null}
                {this.state.showOrHideComment
                  ? this.props.post.comments.map((comment, index) => {
                      if (
                        index != this.props.post.comments.length - 2 &&
                        index != this.props.post.comments.length - 1
                      )
                        return (
                          <Comment
                            Comment={comment}
                            key={comment + Date.now() + index}
                          ></Comment>
                        );
                    })
                  : null}
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
                {enterCommentComponent}
              </section>
            )
          ) : (
            //if caller not bloglist
            <section>
              {this.props.post.comments.map((comment, index) => (
                <Comment
                  Comment={comment}
                  key={comment.commentor + "_" + index}
                ></Comment>
              ))}
              {enterCommentComponent}
            </section>
          )}
        </div>
      </div>
    );
    return component;
  }
}

Blog.getInitialProps = async ({ post, caller }) => {
  return { post: post, caller: caller };
};

export default Blog;
