import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Comment from "./Comment";
import { auth, firestore, firebase } from "../src/firebase/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";

const Blog = ({ post, caller }) => {
  let commentText = "";
  let commentor = "Guest";
  async function handleSubmitComment() {
    if (auth != null && auth != undefined)
      commentor = auth.currentUser.displayName;
    let commentsArr = [];
    let getPost = await firestore
      .collection("posts")
      .doc(post.slug)
      .get();
    commentsArr = getPost.data().comments;
    commentsArr.push({
      commentor: commentor,
      date: firebase.firestore.Timestamp.now(),
      message: commentText
    });
    await firestore
      .collection("posts")
      .doc(post.slug)
      .set(
        {
          comments: commentsArr
        },
        { merge: true }
      )
      .then(() => {
        alert("Comment sent...");
        if (Router.route == "/") Router.push(`/${post.slug}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="blog">
      <Link href={post.slug}>
        <img
          src={post.hero_image}
          alt={post.hero_image}
          className="blog-image"
        ></img>
      </Link>
      <h2 className="blog-title">
        <Link href={post.slug}>
          <a className="blog-title-link">{post.title}</a>
        </Link>
      </h2>
      <div className="blog-text">
        <ReactMarkdown source={post.details} />
      </div>
      <div className="blog-date-author justify-content-between">
        <div className="blog-author-container">
          <span>Posted by : </span>
          <span className="blog-author">{post.author}</span>
        </div>
        <span>{post.date}</span>
      </div>
      <div className="blog-bottom">
        {caller == "bloglist" ? (
          post.comments[0] == undefined ? (
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
                      commentText = text.target.value;
                    }}
                  ></textarea>
                  <a
                    className="btn-floating btn-primary rounded-circle send-comment-button"
                    onClick={handleSubmitComment}
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
              <Comment
                Comment={post.comments[post.comments.length - 1]}
                key={post.comments[post.comments.length - 1]}
              ></Comment>
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
                        commentText = text.target.value;
                      }}
                    ></textarea>
                    <a
                      className="btn-floating btn-primary rounded-circle send-comment-button"
                      onClick={handleSubmitComment}
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
            {post.comments.map((comment, index) => (
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
                      commentText = text.target.value;
                    }}
                  ></textarea>
                  <a
                    className="btn-floating btn-primary rounded-circle send-comment-button"
                    onClick={handleSubmitComment}
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
};

export default Blog;
