// CLASSES

// PRODUCT CLASS
class Product {
    constructor(id, name, price, stock, isOnSale = false, salePercentage = 0) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.isOnSale = isOnSale;
        this.salePercentage = salePercentage;
    }

    // method to calculate discounted price
    discountedPrice() {
        const isOnPromo = promotions.find(promo => promo.productId === this.id && promo.isValid());

        // apply promo discount if there is a valid promo
        if (isOnPromo) {
            const discount = (this.price * isOnPromo.discountPercentage) / 100;
            return this.price - discount;
        }
        // apply sale discount if product is on sale + has a sale percentage noted
        if (this.isOnSale && this.salePercentage > 0) {
            const discount = (this.price * this.salePercentage) / 100;
            return this.price - discount;
        }
        // return price with no discount
        return this.price;
    }

    // check if stock is greater than 0
    isInStock() {
        return this.stock > 0;
    }
}

// CUSTOMER CLASS
class Customer {
    constructor(id, name, preferences = []) {
        this.id = id;
        this.name = name;
        this.orders = []; // array for order history
        this.preferences = preferences;
    }
    // method to add order to customer order history array
    addOrder(order) {
        this.orders.push(order);
    }
    // method to add preferences to array
    addPreference(preference) {
        this.preferences.push(preference);
    }
}

// ORDER CLASS
class Order {
    constructor(id, customer, products = []) {
        this.id = id;
        this.customer = customer;
        this.products = products;
        this.status = 'Preparing Order';
        this.orderDate = new Date();
        this.orderTotal = this.calculateTotal();
    }

    calculateTotal() {
        // totals all the products in the order with discounts
        return this.products.reduce((total, product) => total + product.discountedPrice(), 0);
    }
}

// PROMOTION CLASS
class Promotion {
    constructor(id, productId, discountPercentage, startDate, endDate) {
        this.id = id;
        this.productId = productId;
        this.discountPercentage = discountPercentage;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
    }

    // check if promotion is within start and end dates
    isValid() {
        const today = new Date();
        return today >= this.startDate && today <= this.endDate;
    }
}

// ARRAYS AND SOME HARD-CODED OBJECTS

let promotions = [
    new Promotion('PROMO1', 'P1', 15, '2024-10-27', '2024-11-07'),
    new Promotion('PROMO2', 'P3', 15, '2024-10-27', '2024-11-07'),
];

let products = [
    new Product('P1', 'Moisturizer', 35, 10, true, 15),
    new Product('P2', 'Eye Cream', 25, 15, false),
    new Product('P3', 'Lip Treatment', 15, 3, false),
];

let customers = [
    new Customer('C1', 'Olivia Reyes', 'Skincare'),
    new Customer('C2', 'Aria Chen', 'Lip Products'),
];

let orders = [
    new Order('O1', customers[1], [products[2]]),
];

// add existing order to customer's order history
customers[1].addOrder(orders[0]);

// NAVIGATION FUNCTIONALITY

// event handlers for sidebar menu item clicks
// sets other sections to display none so only selected menu item is visible
// targets links for sidebar nav and top nav
$(document).ready(function() {
    $('#productLink, #productTopLink').on('click', function() {
        $('.product-section').css('display', 'block');
        $('.order-section').css('display', 'none');
        $('.promo-section').css('display', 'none');
        $('.customer-section').css('display', 'none');
        $('.welcome-section').css('display', 'none');
    });

    $('#orderLink, #orderTopLink').on('click', function() {
        $('.order-section').css('display', 'block');
        $('.product-section').css('display', 'none');
        $('.promo-section').css('display', 'none');
        $('.customer-section').css('display', 'none');
        $('.welcome-section').css('display', 'none');
    });

    $('#promotionLink, #promotionTopLink').on('click', function() {
        $('.promo-section').css('display', 'block');
        $('.order-section').css('display', 'none');
        $('.product-section').css('display', 'none');
        $('.customer-section').css('display', 'none');
        $('.welcome-section').css('display', 'none');
    });

    $('#customerLink, #customerTopLink').on('click', function() {
        $('.customer-section').css('display', 'block');
        $('.promo-section').css('display', 'none');
        $('.order-section').css('display', 'none');
        $('.product-section').css('display', 'none');
        $('.welcome-section').css('display', 'none');
    });


    // MOBILE NAV

    $('#productTopLink').on('click', function() {
        $('.product-section').css('display', 'block');
        $('.order-section').css('display', 'none');
        $('.promo-section').css('display', 'none');
        $('.customer-section').css('display', 'none');
        $('.welcome-section').css('display', 'none');
        $('.top-nav').css('display', 'none');
    });

    $('#orderTopLink').on('click', function() {
        $('.order-section').css('display', 'block');
        $('.product-section').css('display', 'none');
        $('.promo-section').css('display', 'none');
        $('.customer-section').css('display', 'none');
        $('.welcome-section').css('display', 'none');
        $('.top-nav').css('display', 'none');
    });

    $('#promotionTopLink').on('click', function() {
        $('.promo-section').css('display', 'block');
        $('.order-section').css('display', 'none');
        $('.product-section').css('display', 'none');
        $('.customer-section').css('display', 'none');
        $('.welcome-section').css('display', 'none');
        $('.top-nav').css('display', 'none');
    });

    $('#customerTopLink').on('click', function() {
        $('.customer-section').css('display', 'block');
        $('.promo-section').css('display', 'none');
        $('.order-section').css('display', 'none');
        $('.product-section').css('display', 'none');
        $('.welcome-section').css('display', 'none');
        $('.top-nav').css('display', 'none');
    });

});

// on click functions for mobile nav
$('#menuIcon').on('click', function() {
    $('.top-nav').css('display', 'block');
});

$('#menuCloseIcon').on('click', function() {
    $('.top-nav').css('display', 'none');
});

// DISPLAY FUNCTIONS

// WELCOME PAGE
// function to display a different welcome message based on the time of day
function displayWelcome() {
    let currentTime = new Date().getHours();
    var msg;

    if (currentTime >= 5 && currentTime < 12) {
        msg = "Good Morning";
    } else if (currentTime >= 12 && currentTime < 17) {
        msg = "Good Afternoon";
    } else {
        msg = "Good Evening";
    }

    // set the correct message
    $('#welcomeMsg').text(msg);
}

// DISPLAY PRODUCTS
function displayProducts() {
    // make sure content containter is empty before appending
    $('#productBody').empty();
    // for each product in the products array
    products.forEach(product => {
        // append the following html
        $('#productBody').append(`
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>${product.isOnSale ? 'Yes' : 'No'}</td>
                <td>
                <button class="deleteProductBtn" data-id="${product.id}">Delete</button>
                </td>
            </tr>
        `);
    });

    // add click event to the appended button
    $('.deleteProductBtn').on('click', deleteProduct);
}

// DISPLAY CUSTOMERS
function displayCustomers() {
    // make sure content containter is empty before appending
    $('#customerBody').empty();
    // for each customer in customers array
    customers.forEach(customer => {
        // map over the customer orders array and join the order history together
        const orderIds = customer.orders.map(order => order.id).join(', ');
        // append the following html
        $('#customerBody').append(`
            <tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${orderIds || 'No Orders'}</td>
                <td>${customer.preferences}</td>
                <td>
                <button class="deleteCustomerBtn" data-id="${customer.id}">Delete</button>
                </td>
            </tr>
        `);
    });

    $('.deleteCustomerBtn').on('click', deleteCustomer);
}


// DISPLAY ORDERS
function displayOrders() {
    // make sure content containter is empty before appending
    $('#orderBody').empty();
    //for each order in the orders array
    orders.forEach(order => {
        // maps over the array of product obejects and joins then together
        const productNames = order.products.map(product => product.name).join(', ');
        //append the following html
        $('#orderBody').append(`
            <tr>
                <td>${order.id}</td>
                <td>${order.orderDate.toLocaleDateString()}</td>
                <td>${order.customer.name}</td>
                <td>${productNames}</td>
                <td>$${order.orderTotal}</td>
                <td>
                    <button class="editOrderBtn" data-id="${order.id}">Edit</button>
                    <button class="deleteOrderBtn" data-id="${order.id}">Delete</button>
                </td>
            </tr>
        `);
    });

    // add click events to appended buttons
    $('.editOrderBtn').on('click', editOrder);
    $('.deleteOrderBtn').on('click', deleteOrder);
}


//DISPLAY PROMOTIONS
function displayPromotions() {
    // make sure content containter is empty before appending
    $('#promoBody').empty();
    // for each promo in the promotions array
    promotions.forEach(promo => {
        // append the following html
        $('#promoBody').append(`
            <tr>
                <td>${promo.id}</td>
                <td>${promo.productId}</td>
                <td>${promo.discountPercentage}%</td>
                <td>${promo.startDate.toLocaleDateString()}</td>
                <td>${promo.endDate.toLocaleDateString()}</td>
                <td>
                    <button class="deletePromoBtn" data-id="${promo.id}">Delete</button>
                </td>
            </tr>
        `);
    });

    // add click events to appended button
    $('.deletePromoBtn').on('click', deletePromotion);
}

// FORM SUBMISSION HANDLERS

// PRODUCT FORM

// setting up on change event to toggle the sale percentage area of form based on the "on sale" checkbox
$('#productOnSale'). on('change', function() {
    const productOnSale = $(this).is(':checked');
    if (productOnSale) {
        // enable if it is checked
        $('#productSalePercentage').prop('disabled', false);
    } else {
        //disable and clear field if it is not
        $('#productSalePercentage').prop('disabled', true). val('');
    }
})

$('#productForm').submit(function (e) {
    // prevent default action of form
    e.preventDefault();
    // get values from product form and save in variables
    const name = $('#productName').val();
    const price = parseFloat($('#productPrice').val());
    const stock = $('#productStock').val();
    const isOnSale = $('#productOnSale').is(':checked');
    const salePercentage = isOnSale ? parseInt($('#productSalePercentage'). val()) : 0;

    // pass values as a new product using constructor
    const newProduct = new Product(`P${products.length + 1}`, name, price, stock, isOnSale, salePercentage);
    // push to product array
    products.push(newProduct);

    // reset display, dropdowns and form
    displayProducts();
    orderProductDropdown();
    promotionProductDropdown();
    $('#productForm')[0].reset();
    // reset the sale percentage field
    $('#productSalePercentage').prop('disabled', true); 
})

// CUSTOMER FORM
$('#customerForm').submit(function (e) {
    // prevent default actions of form
    e.preventDefault();

    //get values from customer form and save into variables
    const name = $('#customerName').val();
    const customerPreferences = $('#customerPreferences').val();

    // if preferences provided, split them by commas and trim whitespace
    const preferences = customerPreferences ? customerPreferences.split(',').map(preference =>preference.trim()) : [];

    // pass all new customer info into the constructor 
    const newCustomer = new Customer(`C${customers.length + 1}`, name, preferences);
    // push to customer array
    customers.push(newCustomer);

    //refresh display, form and customer dropdown
    displayCustomers();
    $('#customerForm')[0].reset();
    orderCustomerDropdown();
});


// ORDER FORM
$('#orderForm').submit(function (e) {
    // prevent default actions of form
    e.preventDefault();
    // get the values from the order form and save into variables
    const customerId = $('#orderCustomerId').val();
    const productIds = $('#orderProductId').val();

    // find customer by matching id
    const customer = customers.find( customer => customer.id === customerId);
    // filter products to get ones selected product id
    const orderedProducts = products.filter(product => productIds.includes(product.id));

    // check stock level using method from product class and alert if product is out of stock
    for (let product of orderedProducts) {
        if (!product.isInStock()) {
            alert(`Sorry, ${product.name} is out of stock!`);
            return;
        }
    }

    // for each product ordered decrease stock count by 1
    orderedProducts.forEach(product => product.stock--);

    // create the new order and push into the orders array
    const newOrder = new Order(`O${orders.length + 1}`, customer, orderedProducts);
    orders.push(newOrder);

    // add order to the customers array
    customer.addOrder(newOrder);

    // refresh so we can changes to orders, products, customers and dropdown menu
    displayOrders();
    displayProducts();
    displayCustomers();
    orderProductDropdown();
    $('#orderForm')[0].reset();


});

// EDIT ORDER FORM
$('#editOrderForm').submit(function (e) {
    // prevent default actions of form
    e.preventDefault();

    // get the values from the order form and save into variables
    const orderId = $('#editOrderId').val();
    const customerId = $('#editCustomerId').val();
    const selectedProductIds = $('#editProductIds').val();

    // find the order by id, new customer by matching id and filter products to get selected product id
    const order = orders.find(order => order.id === orderId);
    const newCustomer = customers.find(customer => customer.id === customerId);
    const updatedProducts = products.filter(product => selectedProductIds.includes(product.id));

    // check stock level of each product using product class method
    for (let product of updatedProducts) {
        if (!product.isInStock()) {
            alert(`Sorry, ${product.name} is out of stock!`);
            // stop submit if product is out of stock
            return; 
        }
    }

    
    // restore stock for old selected products
    order.products.forEach(product => product.stock++);
    // deduct stock for new selected products
    updatedProducts.forEach(product => product.stock--); 
    // update order details and calculate the new order total
    order.customer = newCustomer;
    order.products = updatedProducts;
    order.orderTotal = order.calculateTotal();

    // check if customer has changed
    if (order.customer.id !== customerId) {
        // remove order from previous customer's array
        const previousCustomer = customers.find(customer => customer.id === order.customer.id);
        previousCustomer.orders = previousCustomer.orders.filter(o => o.id !== orderId);

        // add order to the new customer's array
        newCustomer.addOrder(order);
    }

    // hide edit form and refresh display to reflect changes
    $('#editOrderFormContainer').hide();
    displayOrders();
    displayProducts();
});


// PROMOTION FORM
$('#promotionForm').submit(function(e) {
    // prevent default actions of form
    e.preventDefault();
    // get the values from the form inputs and save into variables
    const promoProductID = $('#promoProductId').val();
    const promoPercentage = $('#promoDiscount').val();
    const promoStart = $('#promoStartDate').val();
    const promoEnd = $('#promoEndDate').val();
    // create a new promotion object using construtor
    const newPromo = new Promotion(`PROMO${promotions.length + 1}`, promoProductID, promoPercentage, promoStart, promoEnd);
    // push new promotion into promotions array
    promotions.push(newPromo);

    // refresh display and form
    displayPromotions();
    $('#promotionForm')[0].reset();

});



// FORM DROPDOWN MENU FUNCTIONS

function orderCustomerDropdown() {
    // ensure dropdown content is empty before appending
    $('#orderCustomerId').empty();
    //for each customer in customers array append an option in the drop down menu
    customers.forEach(customer => {
        $('#orderCustomerId').append(`<option value="${customer.id}">${customer.name}</option>`);
    });
}

function orderProductDropdown() {
    // ensure dropdown content is empty before appending
    $('#orderProductId').empty();
    // for each product in products array append an option in the drown down menu
    products.forEach(product => {
        $('#orderProductId').append(`<option value="${product.id}">${product.name} - $${product.price} (${product.stock} in stock)</option>`);
    });
}

function editOrderDropdowns() {
    // ensure dropdown content is empty before appending
    $('#editCustomerId').empty();
    //for each customer in customers array append an option in the drop down menu
    customers.forEach(customer => {
        $('#editCustomerId').append(`<option value="${customer.id}">${customer.name}</option>`);
    });

    // ensure dropdown content is empty before appending
    $('#editProductIds').empty();
    //for each product in products array append an option in the drop down menu
    products.forEach(product => {
        $('#editProductIds').append(`<option value="${product.id}">${product.name} - $${product.price} (${product.stock} in stock)</option>`);
    });
}

function promotionProductDropdown() {
    // ensure dropdown content is empty before appending
    $('#promoProductId').empty();
    //for each product in products array append an option in the drop down menu
    products.forEach(product => {
        $('#promoProductId').append(`<option value="${product.id}">${product.id} - ${product.name}</option>`)
    })
}



// HELPER FUNCTIONS (DELETE, EDIT)

// DELETE PRODUCT
function deleteProduct() {
    //get the product id for that data id atttribute from delete button and save to variable
    const productId = $(this).data('id');
    // remove product with that id from the products array
    products = products.filter(product => product.id !== productId);
    // call function to refresh and call display products
    displayProducts();
}

//DELETE CUSTOMER
function deleteCustomer() {
    //get the customer id for that data id atttribute from delete button and save to variable
    const customerId = $(this).data('id');
    // remove customer with that id from the customers array
    customers = customers.filter(customer => customer.id !== customerId);
    // call function to refresh and call display customers
    displayCustomers();
}


// DELETE ORDER
// variable to hold id of order to be deleted
let orderToDelete = null; 

function deleteOrder() {
    //get the order id for that data id atttribute from delete button and save to variable
    orderToDelete = $(this).data('id');

    // show modal
    $('.modal-background').css('display', 'block');

    
}

// CONFIRM DELETE BTN
$('#yesDelete').on('click', function() {
    if (orderToDelete !== null) {
        // Find the order by ID in the orders array
        const order = orders.find(order => order.id === orderToDelete);

        if (order) {
            // Increase stock for each product in the order
            order.products.forEach(product => {
                product.stock++;
            });

            // remove the order from the orders array
            orders = orders.filter(order => order.id !== orderToDelete);

            // remove the order from the customer's orders array
            const customer = order.customer;
            customer.orders = customer.orders.filter(o => o.id !== orderToDelete);

            // refresh the displays and dropdown
            displayOrders();
            displayProducts();
            displayCustomers();
            orderProductDropdown();

            // clear the stored order ID
            orderToDelete = null;
        }

        // hide the modal
        $('.modal-background').css('display', 'none');
    }
});


// DO NOT DELETE BTN 
$('#noDelete').on('click', function() {
    // clear stored order id
    orderToDelete = null;
    // hide modal
    $('.modal-background').css('display', 'none');

});


//EDIT ORDER
function editOrder() {
    // get the order id from the button data-id attribute
    const orderId = $(this).data('id');
    // find order by id
    const order = orders.find(order => order.id === orderId);

    // set the form to show current order values
    $('#editOrderId').val(order.id);
    $('#editCustomerId').val(order.customer.id);

    // populate product ids for order
    const productIds = order.products.map(p => p.id);
    $('#editProductIds').val(productIds);

    // refresh dropdown so stock is current
    editOrderDropdowns();
    // show the edit order form 
    $('#editOrderFormContainer').show();
}

// DELETE PROMOTION
function deletePromotion() {
    // get promotion id from the button data-id attribute
    const promoId = $(this).data('id');

    // removed promotion with matching id from promotions array
    promotions = promotions.filter(promo => promo.id !== promoId);

    //refresh promotion display
    displayPromotions();

}
   


// on page load call these functions

$(document).ready(function () {
    displayWelcome();
    displayProducts();
    displayCustomers();
    displayOrders();
    displayPromotions();
    orderCustomerDropdown();
    orderProductDropdown();
    promotionProductDropdown();
    editOrderDropdowns();

});

