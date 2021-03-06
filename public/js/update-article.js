// Update article PUT request
const updateArticleHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#article-title").value.trim();
  const summary = document.querySelector("#summary").value.trim();
  const content = document.querySelector("#content").value.trim();
  const id = document.querySelector("#id").getAttribute("data-id");
  if (title && summary && content && id) {
    const response = await fetch(`/api/articles/${id}`, {
      method: "PUT",
      body: JSON.stringify({ id, title, summary, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Redirect to dashboard if successfull
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update article");
    }
  }
};

// DELETE article request
const delButtonHandler = async (event) => {
  event.preventDefault();
  // Confirm that the user wants to delete article
  if (!confirm("Are you sure you want to delete your article?")) {
    return;
  } else if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/articles/${id}`, {
      method: "DELETE",
    });
    // Redirect to dashboard if successfull
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete article");
    }
  }
};

//Event listeners for update and delete buttons
document
  .querySelector(".edit-article")
  .addEventListener("submit", updateArticleHandler);

document.querySelector(".delete").addEventListener("click", delButtonHandler);
