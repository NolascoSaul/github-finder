const URL = "https://api.github.com/users/";

/**
 * Fetches the GitHub user data for a given username.
 * 
 * @param {string} username - The GitHub username to fetch data for.
 * 
 * @returns {Promise<Object>} A promise that resolves to the user's data.
 * 
 * @throws Will throw an error if the user is not found.
 */
export async function fetchUserData(username) {
    const response = await fetch(`${URL}${username}`);
    if (!response.ok) throw new Error("User not found");
    return response.json();
}

/**
 * Fetches the GitHub repositories for a given username, sorted by stars.
 * 
 * @param {string} username - The GitHub username whose repositories are to be fetched.
 * @param {number} [perPage=4] - The number of repositories to fetch per page.
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of the user's repositories.
 * 
 * @throws Will return an empty array if the user is not found or an error occurs.
 */
export async function fetchUserRepos(username, perPage = 4) {
    const response = await fetch(`${URL}${username}/repos?sort=stars&per_page=${perPage}`);
    if (!response.ok) return []
    return response.json();
}