const baseURL = 'https://crudcrud.com/api/651ef3b0b15744adba761fb7b36eb4be/sellerpage';

function getProductData() {
    axios.get(baseURL)
        .then(response => {
            displayProductData(response.data);
        })
        .catch(error => {
            console.error('GET Error:',error);
        });
}

function displayProductData(data) {
    const productDiv = document.getElementById('productList');
    productDiv.innerHTML = '';

    data.forEach(product => {
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
            getProductData();
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
