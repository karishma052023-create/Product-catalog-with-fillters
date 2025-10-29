<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Product Catalog with Filters</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 30px;
      background: #f8f8f8;
    }

    h1 {
      text-align: center;
    }

    .filters {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .catalog {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 20px;
    }

    .product {
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      text-align: center;
    }

    .product h3 {
      margin: 10px 0;
    }

    .price {
      color: green;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>Product Catalog</h1>

  <div class="filters">
    <div>
      <label for="category">Category:</label>
      <select id="category">
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="books">Books</option>
      </select>
    </div>

    <div>
      <label for="priceRange">Max Price: </label>
      <input type="range" id="priceRange" min="0" max="1000" value="1000" />
      <span id="priceValue">1000</span>
    </div>
  </div>

  <div class="catalog" id="catalog"></div>

  <script>
    const products = [
      { name: "Smartphone", category: "electronics", price: 500 },
      { name: "Laptop", category: "electronics", price: 900 },
      { name: "T-Shirt", category: "fashion", price: 30 },
      { name: "Jeans", category: "fashion", price: 60 },
      { name: "Novel", category: "books", price: 15 },
      { name: "Headphones", category: "electronics", price: 120 },
      { name: "Sneakers", category: "fashion", price: 80 },
      { name: "Cookbook", category: "books", price: 25 },
    ];

    const catalogEl = document.getElementById("catalog");
    const categoryEl = document.getElementById("category");
    const priceRangeEl = document.getElementById("priceRange");
    const priceValueEl = document.getElementById("priceValue");

    function displayProducts(items) {
      catalogEl.innerHTML = "";
      if (items.length === 0) {
        catalogEl.innerHTML = "<p>No products match the filters.</p>";
        return;
      }

      items.forEach(p => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
          <h3>${p.name}</h3>
          <p>Category: ${p.category}</p>
          <p class="price">$${p.price}</p>
        `;
        catalogEl.appendChild(div);
      });
    }

    function filterProducts() {
      const selectedCategory = categoryEl.value;
      const maxPrice = parseInt(priceRangeEl.value, 10);
      priceValueEl.textContent = maxPrice;

      const filtered = products.filter(p => {
        const categoryMatch = selectedCategory === "all" || p.category === selectedCategory;
        const priceMatch = p.price <= maxPrice;
        return categoryMatch && priceMatch;
      });

      displayProducts(filtered);
    }

    // Initialize
    categoryEl.addEventListener("change", filterProducts);
    priceRangeEl.addEventListener("input", filterProducts);

    displayProducts(products);
  </script>
</body>
</html>