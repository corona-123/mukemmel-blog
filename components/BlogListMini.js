import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-solid";

const BlogList = ({ posts }) => {
  let initials = "";
  return (
    <div className="blog-list">
      <div className="wrap">
        {posts.map((post, index) => {
          if (post != undefined) {
            if (post.author != "Guest") {
              let firstLetter = post.author.slice(0, 1);
              let secondLetter = post.author.split(" ")[1];
              secondLetter = secondLetter.slice(0, 1);
              initials = firstLetter + secondLetter;
            } else initials = "G";
            return (
              <Link key={index} href={post.slug}>
                <div
                  key={index}
                  className="box"
                  style={{ backgroundImage: "url(" + post.hero_image + ")" }}
                >
                  <div className="date">
                    <h4>{post.date}</h4>
                  </div>
                  <h1>{post.title}</h1>
                  <div className="poster p1">
                    <h4>{initials}</h4>
                  </div>
                </div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

export default BlogList;
