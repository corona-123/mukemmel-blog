import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Comment from "./Comment";

const Blog = ({ post }) => {
  return (
    <div key={post.title} className="blog">
      <Link href={post.slug}>
        <img
          src={`/${post.hero_image}.jpg`}
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
        <Comment postId={post.slug}></Comment>
      </div>
    </div>
  );
};

export default Blog;
