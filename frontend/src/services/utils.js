export const utils = {
    firstToCap,
    randomId,
}

function firstToCap(str) {
    if (!str) return
    const capStr = str.charAt(0).toUpperCase() + str.slice(1)
    return capStr
}

function randomId() {
    var text = "";
    var possible = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var length = 10
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


