import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Blog from "./Blog";

const BlogList = ({ posts }) => {
  return (
    <div className="blog-list">
      {posts.map(post => (
        <Blog post={post}></Blog>
      ))}
    </div>
  );
};

export default BlogList;
