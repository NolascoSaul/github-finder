import { fetchUserData, fetchUserRepos } from "./api.js";
import { loading, displayUserInfo, displayError } from "./ui.js";

const form = document.getElementById("form");
const userInput = document.getElementById("username");
const btnSearch = document.getElementById("btnSearch");
const userSection = document.getElementById("user-info");

window.addEventListener('load', () => {
    userInput.focus();
});

userInput.addEventListener("input", (e) => {
    if (userInput.value.trim() !== "") {
        btnSearch.disabled = false;
    } else {
        btnSearch.disabled = true;
    }
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = userInput.value.trim();
    
    if (!username) return;
    
    try{
        loading(btnSearch);
        const user = await fetchUserData(username);
        const repos = await fetchUserRepos(username);

        const userInfo = {
            name: user.name || 'No name',
            username: user.login,
            avatar: user.avatar_url,
            bio: user.bio || 'No bio yet',
            createdAt: new Date(user.created_at),
            publicRepos: user.public_repos || '0',
            followers: user.followers || '0',
            following: user.following || '0',
            url: user.html_url
        };
        
        displayUserInfo(userInfo, repos, userSection);
    } catch (error) {
        displayError(error.message, userSection);
    } finally {
        btnSearch.disabled = false;
        btnSearch.textContent = 'Search';
    }

    userInput.value = '';
    setTimeout(() => userInput.focus(), 100);
});