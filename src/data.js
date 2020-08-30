const faker = require("faker");
const data = [];
const categories = ["Watersports", "Soccer", "Chess", "Running"];

faker.seed(100);

for(let i = 1; i <= 500; i++) {
    const category = faker.helpers.randomize(categories);
    data.push({
        id: i,
        name: faker.commerce.productName(),
        category: category,
        description: `${category}: ${faker.lorem.sentence(3)}`,
        price: faker.commerce.price()
    });
}


module.exports = function() {
    return {
        products: data,
        categories: categories,
        orders: [
            {
                "id": 1,
                "name": "Alice Jones",
                "city": "New York",
                "description": "Chess: Nihil non nulla.",
                "price": "148.00"
            },
            {
                "id": 2,
                "name": "Rustic Wooden Mouse",
                "category": "Watersports",
                "description": "Watersports: Tempore non dolorem.",
                "price": "453.00"
            },
        ],
    };
};

