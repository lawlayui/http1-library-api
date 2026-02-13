module.exports = (data) => {
    const username = data['username'];
    const password = data['password'];
    if (username === undefined || password === undefined) {
        return {
            status: 'error',
            message: 'key error'
        }
    }
    if (username.length < 3) {
        return {
            status: 'error',
            message: 'username minimal 8'
        }
    }
    if (password.length < 8) {
        return {
            status: 'error',
            message: 'password minimal 8'
        }
    }
    return {
        status: 'succes',
        message: 'validation succes'
    }
}