baseURL = 'https://crudcrud.com/api/3508da5b32024ab68ae989ad849d10af/sellerpage';

function getProductData() {
    axios.get(baseURL)
        .then(response => {
            displayProductData(response.data);
        })
        .catch(error => {
            console.error('GET Error:',error);
        });
}

// Create an object to store products categorized by their respective categories
const categorizedProducts = {};

function displayProductData(data) {
    // Clear the previous content in productList
    const productDiv = document.getElementById('productList');
    productDiv.innerHTML = '';

    // Reset categorizedProducts object to prevent accumulation of previous data
    for (const category in categorizedProducts) {
        categorizedProducts[category] = [];
    }

    // Organize products by category and filter out duplicates
    data.forEach(product => {
        const { category } = product;
        if (!categorizedProducts[category]) {
            categorizedProducts[category] = [];
        }
        const existingProductIndex = categorizedProducts[category].findIndex(
            existingProduct => existingProduct._id === product._id
        );
        if (existingProductIndex === -1) {
            categorizedProducts[category].push(product);
        }
    });

    // Display products by category without duplicates
    for (const category in categorizedProducts) {
        if (categorizedProducts.hasOwnProperty(category) && categorizedProducts[category].length > 0) {
            const productsInCategory = categorizedProducts[category];

            const categoryHeader = document.createElement('h2');
            categoryHeader.textContent = category;
            productDiv.appendChild(categoryHeader);

            productsInCategory.forEach(product => {
                const productEntry = document.createElement('div');
                productEntry.innerHTML = `
                    <p><strong>Product Name:</strong> ${product.productName}</p>
                    <p><strong>Selling Price:</strong> ${product.sellingPrice}</p>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <button class="delete-button" data-product-id="${product._id}">Delete</button>
                    <hr>
                `;
                productDiv.appendChild(productEntry);
            });
        }
    }
}
// Function to add a new product
function addProduct() {
    const productName = document.getElementById('productNameInput').value;
    const sellingPrice = document.getElementById('sellingPriceInput').value;
    const category = document.getElementById('categoryInput').value;

    const productObject = {
        productName: productName,
        sellingPrice: sellingPrice,
        category: category
    };

    axios.post(baseURL, productObject)
        .then(response => {
            console.log('Product added successfully');
            document.getElementById('productNameInput').value = '';
            document.getElementById('sellingPriceInput').value = '';
            getProductData(); // Fetch updated data
        })
        .catch(error => {
            console.error('POST Error:', error);
        });
}

function deleteProduct(productId) {
    axios.delete(`${baseURL}/${productId}`)
        .then(response => {
            console.log(`Product with ID ${productId} deleted`);
            getProductData();
        })
        .catch(error => {
            console.error('DELETE Error:', error);
        });
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
        const productId = event.target.dataset.productId;
        deleteProduct(productId);
    }
});

getProductData();