const users = {Matthew: '123456', Hargen: '234567', Stone: '345678'}

module.exports = {
    isUserExist: function (username, password) {
        return users[username] && users[username] == password
    },
    getToken: function (username, password) {
        return "hehe" + username + "haha" + password
    }
}