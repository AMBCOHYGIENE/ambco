// manufacturersData.js

const fs = require('fs');
const path = require('path');

// Read the products.json file
const productsJson = fs.readFileSync(path.resolve(__dirname, 'products.json'), 'utf8');

// Parse the JSON data
const data = JSON.parse(productsJson);

// Create a function to process the data and return the desired format
function getManufacturersData() {
  const categoryData = data.categories.map(category => {
    const manufacturers = new Set();

    category.subCategories.forEach(subcategory => {
      subcategory.manufacturers.forEach(manufacturer => {
        manufacturers.add(manufacturer.title);
      });
    });

    return {
      title: category.title,
      backgroundImage: category.backgroundImage,
      manufacturers: Array.from(manufacturers)
    };
  });

  return {categories: categoryData};
}

module.exports = getManufacturersData;
