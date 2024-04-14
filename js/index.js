function searchUsers(query) {
    const url = `https://api.github.com/search/users?q=${query}`;
    return fetch(url, {
        headers: {
            Accept: "application/vnd.github.v3+json"

        }
    }).then(response => {
        if (!response.ok) {
            throw Error("Error searching for Users", response.status);
        }
        return response.json();
    }).then(data => {
        return data.items;
    }).catch(error => {
        console.error("Error in searching for Users", error)
        return []
    })
}


function getUserRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`;
    return fetch(url, {
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
            .then(response => {
                if (!response.ok) {
                    throw Error("Error searching for Users", response.status);
                }
                return response.json();
            }).catch(error => {
                console.error("Error in searching for Users", error)
                return []
            })
    })
}


function getUsers (users) {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";
    users.forEach(user => {
        const userElement = document.createElement("div");
        userElement.innerHTML = `
        <img src = "${user.avatar_url}" alt = "${user.login}" />
        <p>${user.login}</p>
        <a href = "${user.html_url}" target="blank" >View Profile</a>
        `;


userElement.addEventListener("click",() => {
    getUserRepos (user.login).then(repos => {
        getRepos(repos);
    })
})
userList.appendChild(userElement);
    })
}


function displayRepos (repos) {
    const repoList = document.getElementById("repo-list");
    repoList.innerHTML = "";
    repos.forEach(repo => {
        const repoElement = document.createElement("div");
        repoElement.innerHTML = `
        <img src = "${repo.owner.avatar_url}" alt = "${repo.name}" />
        <p>${repo.name}</p>
        <a href = "${repo.html_url}" target="blank" >View Repo</a>
        `;
        repoList.appendChild(repoElement);
    })
}

document.getElementById("search-form").addEventListener("submit",function(event) {
 event.preventDefault();
 const searchTerm = document.getElementById("search-input").value;
 searchUsers(searchTerm).then(users => {
     getUsers(users);
 })
});
