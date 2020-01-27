import Blog from "./Blog";

const BlogList = ({ posts }) => {
  let i = 0;
  return (
    <div className="blog-list">
      {posts.map(post => (
        <Blog post={post} caller={"bloglist"} key={i++}></Blog>
      ))}
    </div>
  );
};

export default BlogList;
