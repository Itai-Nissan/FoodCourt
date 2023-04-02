export const utils = {
    firstToCap,
}

function firstToCap(str){
    const capStr = str.charAt(0).toUpperCase() + str.slice(1)
    return capStr
}

