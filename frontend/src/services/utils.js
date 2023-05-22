export const utils = {
    firstToCap,
}

function firstToCap(str){
    if(!str) return
    const capStr = str.charAt(0).toUpperCase() + str.slice(1)
    return capStr
}

