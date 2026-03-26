function add(a, b) {
    return a+b
}
function sub(a, b) {
    return a-b
}

// module.exports = add
// module.exports = sub

// single export
// module.exports = {
//     add,
//     sub
// }

// multiple export
exports.add = add;
exports.div = (a,b) => a / b;