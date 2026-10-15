const price=[120,60,899]
const total=price.reduce((Sum,price) => {
     return Sum+price;
},0);
console.log(total)