const inverArray = (array) => {
    let placeholder = []
    let j = 0

    for(let i = array[array.length-1]; i >= array[0]; i--){
        placeholder[j] = i
        j++
    }

    return placeholder
}