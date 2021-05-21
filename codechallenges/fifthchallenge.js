const shittyFilter = (array, ...args) => 
    array.filter(item => args.indexOf(item) < 0, args)

const y = shittyFilter([5,4,3,2,5], 5,3)
console.log(y);