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

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute("data-id")) {
//     const id = event.target.getAttribute("data-id");

//     const response = await fetch(`/api/articles/${id}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       document.location.replace("/dashboard");
//     } else {
//       alert("Failed to delete article");
//     }
//   }
// };

document
  .querySelector(".new-comment")
  .addEventListener("submit", newCommentHandler);

//   document
//     .querySelector(".article-list")
//     .addEventListener("click", delButtonHandler);
