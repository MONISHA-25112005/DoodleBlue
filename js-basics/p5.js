
async function getUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    users.map(user => {
        console.log(user.name);
    });
}

getUsers();
