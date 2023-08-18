const searchButton = document.getElementById("searchButton");
const usernameInput = document.getElementById("usernameInput");
const resultDiv = document.getElementById("result");
const clearButton = document.getElementById("clearButton");

searchButton.addEventListener("click", async () => {
  const username = usernameInput.value;
  if (username.trim() === "") {
    resultDiv.innerHTML = "Please enter a GitHub username.";
    return;
  }
  
  resultDiv.innerHTML = "Loading...";

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const Data = await response.json();

    if (response.status === 200) {
      const profile = `
        <a target="_blank" href="https://www.github.com/${username}"><img src="${Data.avatar_url}"/>
          <h2>${Data.login}</h2>
          <p>Bio: ${Data.bio || "Not specified"}</p>
          <p>Location: ${Data.location || "Not specified"}</p>
          <p>Name: ${Data.name || "N/A"}</p>
          <p>Followers: ${Data.followers}</p>
          <p>Following: ${Data.following}</p>
          <p>Public Repositories: ${Data.public_repos}</p>
        
      `;
      resultDiv.innerHTML = profile;
    } else {
      resultDiv.innerHTML = "User not found.";
    }
  } catch (error) {
    resultDiv.innerHTML = "An error occurred. Please try again.";
  }
});
clearButton.addEventListener("click", () => {
    usernameInput.value = ""; // Clear the input field
    resultDiv.innerHTML = ""; // Clear the result display
  });