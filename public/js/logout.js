// User logut request
const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  // Redirect to login page if request is successful
  if (response.ok) {
    document.location.replace("/login");
  } else {
    alert(response.statusText);
  }
};
// Event listener for logout button
document.querySelector("#logout").addEventListener("click", logout);
