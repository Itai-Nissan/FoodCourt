export const utils = {
    firstToCap,
    randomId,
    validatInput,
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

function validatInput(value, inputType) {
    // console.log(value, inputType);
    if (value.includes('$')) {
        return 'Please do not use $ sign'
    }
    if (!value) {
        // console.log('no value');
        return `Please enter a valid ${inputType} name`
    } else return true
}


