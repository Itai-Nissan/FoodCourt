
module.exports = {
    randomId,
    firstToLow,
    cleaningJson,
    sliceJson,
}

function firstToLow(str) {
    const capStr = str.charAt(0).toLowerCase() + str.slice(1)
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

function cleaningJson() {
    let updatedTastyRecipe = []
    tastyRecipes.map((recipe) => {
        let recipeToInsert = {}
        for (const [key, value] of Object.entries(recipe)) {
            console.log(`${key}: ${value}`)
            if (key == 'id' ||
                key == 'description' ||
                key == 'topics' ||
                key == 'sections' ||
                key == 'thumbnail_url' ||
                key == 'tags' ||
                key == 'country' ||
                key == 'credits' ||
                key == 'created_at' ||
                key == 'name' ||
                key == 'instructions' ||
                key == 'original_video_url'
            ) {
                Object.defineProperty(recipeToInsert, `${key}`, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true,
                })
                // recipeToInsert.`${key}` = value
            }
        }
        updatedTastyRecipe.push(recipeToInsert)
    })
    // console.log(updatedTastyRecipe.length);
    _writeToJson('updatedTastyRecipe', updatedTastyRecipe)
    return updatedTastyRecipe
}

function sliceJson() {
    let start = 0
    let amount = 79
    let listA = updatedTastyRecipe.slice(start, start + amount)
    console.log('list.slice:', listA.length);
    listA.map((recipe) => {
        updatedTastyRecipe1.push(recipe)
    })
    _writeToJson('updatedTastyRecipe1', updatedTastyRecipe1)
    start = start + amount

    let listB = updatedTastyRecipe.slice(start, start + amount)
    console.log('list.slice:', listB.length);
    listB.map((recipe) => {
        updatedTastyRecipe2.push(recipe)
    })
    _writeToJson('updatedTastyRecipe2', updatedTastyRecipe2)
    start = start + amount

    let listC = updatedTastyRecipe.slice(start, start + amount)
    console.log('list.slice:', listC.length);
    listC.map((recipe) => {
        updatedTastyRecipe3.push(recipe)
    })
    _writeToJson('updatedTastyRecipe3', updatedTastyRecipe3)
    start = start + amount

    let listD = updatedTastyRecipe.slice(start, start + amount)
    console.log('list.slice:', listD.length);
    listD.map((recipe) => {
        updatedTastyRecipe4.push(recipe)
    })
    _writeToJson('updatedTastyRecipe4', updatedTastyRecipe4)
    start = start + amount

    // let listE = tastyRecipes.slice(start, start + amount)
    // console.log('list.slice:', listE.length);
    // listE.map((recipe) => {
    //   tastyRecipesE.push(recipe)
    // })
    // _writeToJson('tastyRecipesE', tastyRecipesE)
    // start = start + amount

    // let listF = tastyRecipes.slice(start, start + amount)
    // console.log('list.slice:', listF.length);
    // listF.map((recipe) => {
    //   tastyRecipesF.push(recipe)
    // })
    // _writeToJson('tastyRecipesF', tastyRecipesF)
    // start = start + amount
}


