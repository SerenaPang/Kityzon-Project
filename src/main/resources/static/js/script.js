
/* List of products in the cart. */
let cart = [];

/* List of product returned by the search query. */
let currentProducts = [];

function searchProduct() {
    let productName = document.getElementById("search_bar").value;

    productName = productName.trim();
    if (productName.length == 0) {
        alert("Please write a product name");
        return;
    }

    searchProductAjaxCall(productName);
}

function searchProductAjaxCall(productName) {
    // Webservice URL to search for products.
    let url = "/searchByQuery?query=" + productName;

    // https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Network_requests
    // Call `fetch()`, passing in the URL.
    fetch(url)
        // fetch() returns a promise. When we have received a response from the server,
        // the promise's `then()` handler is called with the response.
        .then((response) => {
            // Our handler throws an error if the request did not succeed.
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            // Otherwise (if the response succeeded), our handler fetches the response
            // as text by calling response.text(), and immediately returns the promise
            // returned by `response.text()`.
            return response.text();
        })
        // When response.text() has succeeded, the `then()` handler is called with
        // the text, and we copy it into the `poemDisplay` box.
        .then((text) => {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
            const products = JSON.parse(text);
            currentProducts = products;
            renderProducts(products);
        })
        // Catch any errors that might happen, and display a message
        // in the `poemDisplay` box.
        .catch((error) => {
            alert(`Could not fetch products: ${error}`);
        });
}

// https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
function renderProducts(products) {
    // creates a <table> element.
    const tbl = document.createElement("table");
    const resultsDiv = document.getElementById("results");

    // Remove Previous results
    while (resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.firstChild);
    }

    const firstRow = document.createElement("tr");
    insertTableHeader(firstRow, "Name");
    insertTableHeader(firstRow, "Description");
    insertTableHeader(firstRow, "Brand");
    insertTableHeader(firstRow, "Price");
    insertTableHeader(firstRow, "Order");
    tbl.appendChild(firstRow);

    // creating all cells
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        // creates a table row
        const row = document.createElement("tr");

        insertTableData(row, product.name);
        insertTableData(row, product.description);
        insertTableData(row, product.brand);
        insertTableData(row, product.price);
        insertAddToCartButton(row, product.id);
        // TODO: Insert <input type="text" ...> here for quantity.

        // add the row to the end of the table body
        tbl.appendChild(row);
    }
    // appends <table> into <body>
    resultsDiv.appendChild(tbl);
}

function insertAddToCartButton(row, productId) {
    let button = document.createElement("input");
    button.type = "button";
    button.value = "Add to cart";
    // Add handler for the onclick event.
    button.onclick = function () {
        addProductToCart(productId)
    };
    row.appendChild(button);
}

function insertTableHeader(row, text) {
    let cell = document.createElement("th");
    let cellText = document.createTextNode(text);
    cell.appendChild(cellText);
    row.appendChild(cell);
}

function insertTableData(row, text) {
    let cell = document.createElement("td");
    let cellText = document.createTextNode(text);
    cell.appendChild(cellText);
    row.appendChild(cell);
}

function addProductToCart(productId) {
    let product;

    for (let i = 0; i < currentProducts.length ; i++) {
        if (productId == currentProducts[i].id) {
            product = currentProducts[i];
            break;
        }
    }
    // TODO: Extract quantity of the input text.
    // product.quantity = (value extracted from input text)

    // TODO: Make AJAX call to update the Cart in the server.
    cart.push(product);
    renderCart();
}

/* Renders the content of the cart */
function renderCart() {
    // creates a <table> element.
    const tbl = document.createElement("table");
    const myCartDiv = document.getElementById("mycart");

    // Remove Previous elements in the div with id "mycart".
    while (myCartDiv.firstChild) {
        myCartDiv.removeChild(myCartDiv.firstChild);
    }

    const firstRow = document.createElement("tr");
    insertTableHeader(firstRow, "Name");
    insertTableHeader(firstRow, "Price");
    insertTableHeader(firstRow, "Quantity");
    tbl.appendChild(firstRow);

    // creating the table data
    for (let i = 0; i < cart.length; i++) {
        let product = cart[i];
        // creates a table row
        const row = document.createElement("tr");

        insertTableData(row, product.name);
        insertTableData(row, product.price);
        // TODO: Get the quantity from input box
        insertTableData(row, 1);

        // TODO: Add remove button.

        // add the row to the end of the table.
        tbl.appendChild(row);
    }
    // appends <table> into <body>
    myCartDiv.appendChild(tbl);
}
