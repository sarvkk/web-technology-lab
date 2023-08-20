// Get references to various DOM elements
const searchButton = document.getElementById("searchButton");
const usernameInput = document.getElementById("usernameInput");
const resultDiv = document.getElementById("result");
const clearButton = document.getElementById("clearButton");

// Add an event listener to the search button
searchButton.addEventListener("click", async () => {
  const username = usernameInput.value;
  if (username.trim() === "") {
    // Check if the username input is empty
    resultDiv.innerHTML = "Please enter a GitHub username.";
    return;
  }
  
  // Display a loading message
  resultDiv.innerHTML = "Loading...";

  try {
    // Fetch user data from the GitHub API
    const response = await fetch(`https://api.github.com/users/${username}`);
    const userData = await response.json();

    if (response.status === 200) {
      // Construct a user profile HTML
      const profile = `
        <a target="_blank" href="https://www.github.com/${username}"><img src="${userData.avatar_url}"/>
          <h2>${userData.login}</h2>
          <p>Bio: ${userData.bio || "Not specified"}</p>
          <p>Location: ${userData.location || "Not specified"}</p>
          <p>Name: ${userData.name || "N/A"}</p>
          <p>Followers: ${userData.followers}</p>
          <p>Following: ${userData.following}</p>
          <p>Public Repositories: ${userData.public_repos}</p>
      `;
      // Display the user profile
      resultDiv.innerHTML = profile;
    } else {
      // Display a message if the user is not found
      resultDiv.innerHTML = "User not found.";
    }
  } catch (error) {
    // Display an error message if an exception occurs
    resultDiv.innerHTML = "An error occurred. Please try again.";
  }
});

// Add an event listener to the clear button
clearButton.addEventListener("click", () => {
    usernameInput.value = ""; // Clear the input field
    resultDiv.innerHTML = ""; // Clear the result display
});
 