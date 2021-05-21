const chunkArray = (array, number) => {
    if(array.length <= number){
        return [array]
    }

    return [array.slice(0, number), ...chunkArray(array.slice(number), number)]
}