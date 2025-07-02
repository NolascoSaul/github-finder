import { formatDate, createElement } from "./utils.js";

/**
 * Displays the user information and repositories in the container.
 * 
 * @param {Object} userInfo - The user information object containing the following properties:
 *   - avatar: The URL of the user's avatar.
 *   - name: The user's name.
 *   - username: The user's username.
 *   - bio: The user's bio.
 *   - createdAt: The date the user joined GitHub.
 *   - publicRepos: The number of public repositories the user has.
 *   - followers: The number of followers the user has.
 *   - following: The number of people the user is following.
 *   - repos: An array of repository objects containing the following properties:
 *     - name: The name of the repository.
 *     - url: The URL of the repository.
 *     - description: The description of the repository.
 *     - stars: The number of stars the repository has.
 *     - forks: The number of forks the repository has.
 *     - language: The language of the repository (optional).
 */
export function displayUserInfo(userInfo, repos, container) {
    container.innerHTML = '';

    // --- Main container for user info ---
    const userInfoContainer = createElement('div', 'container user-info');

    // Avatar container 
    const avatarDiv = createElement('div', 'user-avatar');

    const avatarImg = createElement('img', 'avatar');
    avatarImg.src = userInfo.avatar;
    avatarImg.alt = `${userInfo.name}'s avatar`;

    const profileButton = createElement('button', 'button');

    const profileLink = createElement('a');
    profileLink.innerHTML = '<i class="fas fa-arrow-up-right-from-square"></i> View Profile';
    profileLink.href = userInfo.url;
    profileLink.target = '_blank';
    profileLink.rel = 'noopener noreferrer';
    profileLink.ariaLabel = `View ${userInfo.name}'s profile on GitHub`;

    profileButton.appendChild(profileLink);
    avatarDiv.append(avatarImg, profileButton);

    // User details container
    const detailsDiv = createElement('div', 'user-details');

    // Name and username container
    const nameDiv = createElement('div', 'user-name');

    const nameH3 = createElement('h3', null, userInfo.name);

    const usernameP = createElement('p', null, `@${userInfo.username}`);

    nameDiv.append(nameH3, usernameP);

    // Bio
    const bioP = createElement('p', null, userInfo.bio);

    // Join date
    const joinDateP = createElement('p');
    joinDateP.innerHTML = `<i class="fa-regular fa-calendar"></i> Joined ${formatDate(userInfo.createdAt)}`;

    // User stats
    const statsDiv = createElement('div', 'user-stats');

    const stats = [
        { icon: 'fa-book-open', value: userInfo.publicRepos, label: 'repositories' },
        { icon: 'fa-user-friends', value: userInfo.followers, label: 'followers' },
        { icon: 'fa-user-plus', value: userInfo.following, label: 'following' }
    ];

    stats.forEach(stat => {
        const statDiv = createStat(stat.icon, stat.value, stat.label);
        statsDiv.appendChild(statDiv);
    });

    detailsDiv.append(nameDiv, bioP, joinDateP, statsDiv);
    userInfoContainer.append(avatarDiv, detailsDiv);

    // --- Main container for user repositories ---
    const reposContainer = createElement('div', 'container user-repos');

    // Repositories header
    const reposHeaderDiv = createElement('div', 'repos-header');

    const reposTitleH3 = createElement('h3', null, 'Top Repositories');

    const reposDescriptionP = createElement('p', null, 'Most popular repositories based on stars.');

    reposHeaderDiv.appendChild(reposTitleH3);
    reposHeaderDiv.appendChild(reposDescriptionP);
    reposContainer.appendChild(reposHeaderDiv);

    // Repositories list
    const reposBodyDiv = document.createElement('div');
    reposBodyDiv.classList.add('repos-body');
    if (repos.length > 0) {
        repos.forEach(repo => {
            const repoDiv = createElement('div', 'repo');

            const repoTitleH4 = document.createElement('h4');
            const repoLink = createElement('a', '', repo.name);
            repoLink.href = repo.url;
            repoLink.target = '_blank';
            repoLink.rel = 'noopener noreferrer';
            repoLink.ariaLabel = `View ${repo.name} on GitHub`;
            repoTitleH4.appendChild(repoLink);

            const repoDesc = createElement('p', null, repo.description);

            const repoDetailsDiv = createElement('div', 'repo-details');

            const repoStars = document.createElement('p');
            repoStars.innerHTML = `<i class="fa-regular fa-star"></i> ${repo.stargazers_count}`;

            const repoForks = document.createElement('p');
            repoForks.innerHTML = `<i class="fa-solid fa-code-fork"></i> ${repo.forks}`;

            if (repo.language) {
                const repoLanguage = createElement('p', 'repo-language', repo.language);
                repoDetailsDiv.append(repoLanguage, repoStars, repoForks);
            } else {
                repoDetailsDiv.append(repoStars, repoForks);
            }

            repoDiv.append(repoTitleH4, repoDesc, repoDetailsDiv);
            reposBodyDiv.append(repoDiv);
        });

        reposContainer.appendChild(reposBodyDiv);
    } else {
        const noRepos = createElement('p', 'no-repos', 'No repositories found.');
        reposContainer.appendChild(noRepos);
    }

    container.append(userInfoContainer, reposContainer);
}


/**
 * Displays an error message in the provided container element.
 * 
 * @param {string} message - The error message to display.
 * @param {HTMLElement} container - The container element in which to display the error.
 */
export function displayError(message, container) {
    container.innerHTML = '';
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error');
    errorDiv.textContent = message;
    container.appendChild(errorDiv);
}

/**
 * Disables the given button and changes its text to "Loading...".
 * 
 * @param {HTMLButtonElement} button - The button element to be disabled and updated.
 */
export function loading(button) {
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
}

/**
 * Creates a "stat" element containing an icon, value, and label.
 * 
 * @param {string} iconClass - The class for the icon element, e.g. "book".
 * @param {string} value - The value to display next to the icon.
 * @param {string} label - The label to display next to the value.
 * 
 * @returns {Element} The created stat element.
 */
function createStat(iconClass, value, label) {
    const statDiv = createElement('div', 'stat');

    const icon = document.createElement('i');
    icon.classList.add('fa-solid', iconClass);

    const valueP = createElement('p', null, value);

    const labelSpan = createElement('span', null, label);

    statDiv.append(icon, valueP, labelSpan);
    return statDiv;
}