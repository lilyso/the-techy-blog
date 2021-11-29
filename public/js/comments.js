const newCommentHandler = async (event) => {
  event.preventDefault();

  const newComment = document.querySelector("#comment").value.trim();
  const articleId = document.querySelector("#articleId").value;

  if (newComment) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ newComment, articleId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      location.reload();
    } else {
      alert("Failed to add comment");
    }
  }
};

const delCommentHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      location.reload();
    } else {
      alert("Failed to delete comment");
    }
  }
};

const toggleEditForms = async (event) => {
  event.preventDefault();
  const id = event.target.getAttribute("data-id");

  document.querySelector(`.comment-${id}-form`).classList.toggle("d-none");
  document.querySelector(`.comment-${id}-text`).classList.toggle("d-none");
};

const updateComment = async (event) => {
  event.preventDefault();

  let newComment = event.target.comment.value;
  let id = event.target.id.value;

  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify({ comment: newComment }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  //check here if ok first

  document.querySelector(`.comment-${id}-form`).classList.toggle("d-none");
  document.querySelector(`.comment-${id}-p`).innerHTML = newComment;
  document.querySelector(`.comment-${id}-text`).classList.toggle("d-none");
  //fire away
};

document
  .querySelector(".new-comment")
  .addEventListener("submit", newCommentHandler);

var buttons = document.querySelectorAll(".delete-comment");

buttons.forEach(function (button) {
  button.addEventListener("click", delCommentHandler);
});

var editbuttons = document.querySelectorAll(".edit-comment-link");

editbuttons.forEach(function (button) {
  button.addEventListener("click", toggleEditForms);
});

var editFoms = document.querySelectorAll(".update-comment");

editFoms.forEach(function (button) {
  button.addEventListener("submit", updateComment);
});
