import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Comment from "./Comment";
import { auth } from "../src/firebase/index";

const Blog = ({ post, caller }) => {
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
      <div className="blog-date">{post.date}</div>
      <div className="blog-bottom">
        {caller == "bloglist" ? (
          post.comments[0] == undefined ? (
            <div class="media mt-3">
              <img
                class="d-flex rounded-circle avatar z-depth-1-half mr-3"
                src={
                  auth.currentUser.isAnonymous
                    ? "http://www.jdevoto.cl/web/wp-content/uploads/2018/04/default-user-img.jpg"
                    : auth.currentUser.photoURL
                }
                alt="Generic placeholder image"
                height="100px"
              />
              <div class="media-body">
                <h5 class="mt-0 font-weight-bold blue-text">
                  {auth.currentUser.isAnonymous
                    ? "Guest"
                    : auth.currentUser.displayName}
                </h5>
                <div class="form-group basic-textarea rounded-corners">
                  <textarea
                    class="form-control z-depth-1"
                    id="Textarea"
                    rows="3"
                    placeholder="Write your comment..."
                  ></textarea>
                </div>
              </div>
            </div>
          ) : (
            <section>
              <Comment
                Comment={post.comments[post.comments.length - 1]}
                key={post.comments[post.comments.length - 1]}
              ></Comment>
              <div class="media mt-3">
                <img
                  class="d-flex rounded-circle avatar z-depth-1-half mr-3"
                  src={
                    auth.currentUser.isAnonymous
                      ? "http://www.jdevoto.cl/web/wp-content/uploads/2018/04/default-user-img.jpg"
                      : auth.currentUser.photoURL
                  }
                  alt="Generic placeholder image"
                  height="100px"
                />
                <div class="media-body">
                  <h5 class="mt-0 font-weight-bold blue-text">
                    {auth.currentUser.isAnonymous
                      ? "Guest"
                      : auth.currentUser.displayName}
                  </h5>
                  <div class="form-group basic-textarea rounded-corners">
                    <textarea
                      class="form-control z-depth-1"
                      id="Textarea"
                      rows="3"
                      placeholder="Write your comment..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </section>
          )
        ) : (
          <section>
            {post.comments.map(comment => (
              <Comment
                Comment={comment}
                key={comment.commentor + comment.message}
              ></Comment>
            ))}
            <div class="media mt-3">
              <img
                class="d-flex rounded-circle avatar z-depth-1-half mr-3"
                src={
                  auth.currentUser.isAnonymous
                    ? "http://www.jdevoto.cl/web/wp-content/uploads/2018/04/default-user-img.jpg"
                    : auth.currentUser.photoURL
                }
                alt="Generic placeholder image"
                height="100px"
              />
              <div class="media-body">
                <h5 class="mt-0 font-weight-bold blue-text">
                  {auth.currentUser.isAnonymous
                    ? "Guest"
                    : auth.currentUser.displayName}
                </h5>
                <div class="form-group basic-textarea rounded-corners">
                  <textarea
                    class="form-control z-depth-1"
                    id="Textarea"
                    rows="3"
                    placeholder="Write your comment..."
                  ></textarea>
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
