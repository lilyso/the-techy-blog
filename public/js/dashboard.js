const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#article-title").value.trim();
  const summary = document.querySelector("#article-summary").value.trim();
  const content = document.querySelector("#article-body").value.trim();

  if (title && summary && content) {
    const response = await fetch(`/api/articles`, {
      method: "POST",
      body: JSON.stringify({ title, summary, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create article");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/articles/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete article");
    }
  }
};

document
  .querySelector(".new-article")
  .addEventListener("submit", newFormHandler);
