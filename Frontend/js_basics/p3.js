
const car = {
    brand: "Suzuki",
    color: "black",
    year: 2020,

    greet() {
        return "My Scooter is " + this.brand +
               " and color is " + this.color +
               " and year is " + this.year;
    }
};


console.log(car.brand);

console.log(car["color"]);

car.color = "red";
console.log(car.color);


car.price = 80000;
console.log(car.price);


delete car.year;
console.log(car);

console.log("brand" in car);
console.log("year" in car);  

console.log(car.greet());
