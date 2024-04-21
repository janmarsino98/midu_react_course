users = [{ "name": "jan", "occupation": "audit" }, { "name": "roger", "occupation": "tech" }]

let newUsers = users.filter((user) => {
    return user.name === "jan"
})

console.log(newUsers)