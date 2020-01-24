import Blog from "./Blog";

const BlogList = ({ posts }) => {
  return (
    <div className="blog-list">
      {posts.map(post => (
        <Blog post={post} key={post.title}></Blog>
      ))}
    </div>
  );
};

export default BlogList;
