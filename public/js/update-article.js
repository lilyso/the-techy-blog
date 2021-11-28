const updateArticleHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#article-title").value.trim();
  const summary = document.querySelector("#article-summary").value.trim();
  const content = document.querySelector("#article-body").value.trim();
  const articleId = document.querySelector("#articleId").value;

  if (title && summary && content) {
    const response = await fetch(`/api/articles`, {
      method: "PUT",
      body: JSON.stringify({ articleId, title, summary, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update article");
    }
  }
};

document
  .querySelector(".edit-article")
  .addEventListener("submit", updateArticleHandler);
