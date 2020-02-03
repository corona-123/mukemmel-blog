import React from "react";
import Link from "next/link";
import { auth } from "../src/firebase/index";

const Comment = ({ Comment }) => {
  let initials = "";
  if (Comment.commentor != "Guest") {
    let firstLetter = Comment.commentor.slice(0, 1);
    let secondLetter = Comment.commentor.split(" ")[1];
    secondLetter = secondLetter.slice(0, 1);
    initials = firstLetter + secondLetter;
  }
  initials != "" ? initials : "Guest";
  return (
    <div className="media mt-3 shadow-textarea">
      <img
        className="d-flex rounded-circle avatar z-depth-1-half mr-3"
        src={
          auth.currentUser != null
            ? auth.currentUser.uid == Comment.commentorID
              ? auth.currentUser.photoURL
              : "http://www.jdevoto.cl/web/wp-content/uploads/2018/04/default-user-img.jpg"
            : "http://www.jdevoto.cl/web/wp-content/uploads/2018/04/default-user-img.jpg"
        }
        height="100px"
        alt="Avatar"
      />
      <div className="media-body">
        <Link href={`/profile/${[Comment.commentorID]}`}>
          <a className="commentor-container ">
            <h5 className="mt-0 font-weight-bold commentor">
              {Comment.commentor}
            </h5>
          </a>
        </Link>
        {Comment.message}
      </div>
      <div className="comment-date">
        {new Date(
          (Comment.date.seconds + Comment.date.nanoseconds / 1000000000) * 1000
        ).toDateString("dd/mm/yyyy")}
      </div>
    </div>
  );
};

export default Comment;
