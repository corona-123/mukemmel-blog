import Blog from "./Blog";
import { firebase, auth, firestore } from "../src/firebase/index";

const BlogList = ({ posts }) => {
  let i = 0;
  return (
    <div className="blog-list">
      {posts.map(post => (
        <Blog post={post} key={i++}></Blog>
      ))}
    </div>
  );
};

export default BlogList;
