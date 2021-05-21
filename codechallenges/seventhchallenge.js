const identicalArrays = (arrays) => {
    const first = JSON.stringify(arrays[0])
    const second = JSON.stringify(arrays[1])
    
    return first === second
}