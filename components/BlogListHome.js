import Link from "next/link";
import { auth } from "../src/firebase/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEye, faComment } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";
import { FacebookShareButton } from "react-share";
import { faShareAlt } from "@fortawesome/fontawesome-free-solid";

const BlogList = ({ posts }) => {
  let i = 0;
  return (
    <div className=" wrap">
      {posts.map((post, index) => (
        // <Blog post={post} caller={"bloglist"} key={i++}></Blog>

        <div className="card-container mx-5" key={index}>
          <div className="card-blog">
            <Link href={post.slug}>
              <div className="card__image-container text-center">
                <img className="card__image" src={post.hero_image} alt="" />
              </div>
            </Link>
            <Link href={post.slug}>
              <svg className="card__svg" viewBox="0 0 800 500">
                <path
                  d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500"
                  stroke="transparent"
                  fill="#333"
                />
                <path
                  className="card__line"
                  d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400"
                  stroke="pink"
                  strokeWidth="3"
                  fill="transparent"
                />
              </svg>
            </Link>

            <div className="card__content">
              <Link href={post.slug}>
                <h1 className="card__title text-center" title={post.title}>
                  {post.title}
                </h1>
              </Link>
              <div className="card__details">
                <ReactMarkdown source={post.details} />
              </div>
              <div className="justify-content-end row my-4">
                <p className="mr-1">{post.likes.length}</p>
                <p className="mr-4">
                  <FontAwesomeIcon
                    icon={faHeart}
                    width="19px"
                    title="Likes"
                  ></FontAwesomeIcon>
                </p>
                <p className="mr-1">{post.comments.length}</p>
                <p className="mr-4">
                  <FontAwesomeIcon
                    icon={faComment}
                    width="19px"
                    title="Comments"
                  ></FontAwesomeIcon>
                </p>
                <p className="mr-1">{post.views}</p>
                <p>
                  <FontAwesomeIcon
                    icon={faEye}
                    width="19px"
                    title="Views"
                  ></FontAwesomeIcon>
                </p>
              </div>
              <div className="justify-content-between row mt-1">
                <p>
                  <span>by </span>
                  <Link
                    href={
                      auth.currentUser.uid == post.userID
                        ? "/profile"
                        : `/profile/${[post.userID]}`
                    }
                  >
                    <span className="author">{post.author}</span>
                  </Link>
                </p>
                <p>{post.date}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
