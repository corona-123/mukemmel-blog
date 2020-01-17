import React from "react";

const Comment = ({ postId }) => (
  //   <div class="form-group shadow-textarea">
  //     <label for={`commentArea_${postId}`}>Your Comment:</label>
  //     <textarea
  //       class="form-control z-depth-1"
  //       id={`commentArea_${postId}`}
  //       rows="3"
  //       placeholder="Write something here..."
  //     ></textarea>
  //   </div>
  <div class="media">
    <img
      class="d-flex rounded-circle avatar z-depth-1-half mr-3"
      src="https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg"
      alt="Avatar"
    />
    <div class="media-body">
      <h5 class="mt-0 font-weight-bold blue-text">Anna Smith</h5>
      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
      ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
      viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
      lacinia congue felis in faucibus.
      <div class="media mt-3 shadow-textarea">
        <img
          class="d-flex rounded-circle avatar z-depth-1-half mr-3"
          src="https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg"
          alt="Generic placeholder image"
        />
        <div class="media-body">
          <h5 class="mt-0 font-weight-bold blue-text">Danny Tatuum</h5>
          <div class="form-group basic-textarea rounded-corners">
            <textarea
              class="form-control z-depth-1"
              id="exampleFormControlTextarea345"
              rows="3"
              placeholder="Write your comment..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Comment;
