document.addEventListener('DOMContentLoaded', () => {
    const menuItems = [
        { name: 'Pizza', price: 10 },
        { name: 'Burger', price: 8 },
        { name: 'Pasta', price: 12 },
        { name: 'Salad', price: 6 },
        { name: 'Soda', price: 2 },
        { name: 'Coffee', price: 3 },
    ];

    let order = [];

    function renderMenu() {
        const menuSection = document.getElementById('menu-items');
        menuItems.forEach(item => {
            const menuItemDiv = document.createElement('div');
            menuItemDiv.classList.add('menu-item');
            menuItemDiv.textContent = `${item.name} - $${item.price}`;
            menuItemDiv.addEventListener('click', () => addItemToOrder(item));
            menuSection.appendChild(menuItemDiv);
        });
    }

    function addItemToOrder(item) {
        const existingItem = order.find(orderItem => orderItem.name === item.name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            order.push({ ...item, quantity: 1 });
        }
        renderOrder();
    }

    function renderOrder() {
        const orderTableBody = document.getElementById('order-items');
        orderTableBody.innerHTML = '';
        let totalPrice = 0;

        order.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td>$${(item.quantity * item.price).toFixed(2)}</td>
            `;
            orderTableBody.appendChild(row);
            totalPrice += item.quantity * item.price;
        });

        document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    }

    document.getElementById('checkout-button').addEventListener('click', () => {
        alert(`The total amount is $${document.getElementById('total-price').textContent}`);
        order = []; // Reset the order after checkout
        renderOrder(); // Render the order to clear the table
    });

    renderMenu();
});
