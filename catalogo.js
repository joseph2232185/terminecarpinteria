document.addEventListener('DOMContentLoaded', () => {
    const carrito = []; // Array que contendrá los productos en el carrito
    const productos = document.querySelectorAll('.producto'); // Selecciona todos los productos
    const listaCarrito = document.getElementById('lista-carrito'); // Donde se mostrarán los productos del carrito
    const totalElement = document.getElementById('total'); // Donde se mostrará el total
    const comprarBtn = document.getElementById('comprar-btn'); // Botón "Comprar"

    // Función para agregar productos al carrito
    productos.forEach(producto => {
        const button = producto.querySelector('.add-to-cart');
        button.addEventListener('click', () => {
            const nombre = producto.dataset.nombre;
            addToCart({ nombre });
        });
    });

    // Función para añadir un producto al carrito
    function addToCart(producto) {
        carrito.push(producto);
        renderCart();
    }

    // Función para renderizar el contenido del carrito
    function renderCart() {
        listaCarrito.innerHTML = ''; // Limpia el carrito antes de renderizar

        carrito.forEach((producto, index) => {
            const item = document.createElement('li');
            item.textContent = `${producto.nombre}`;

            // Crear botón de eliminar
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.addEventListener('click', () => {
                removeFromCart(index);
            });

            item.appendChild(removeButton);
            listaCarrito.appendChild(item);
        });

        totalElement.textContent = ''; // Vacía el total
    }

    // Función para eliminar un producto del carrito
    function removeFromCart(index) {
        carrito.splice(index, 1); // Elimina el producto del array
        renderCart(); // Vuelve a renderizar el carrito
    }

    // Funcionalidad del botón "Comprar"
    comprarBtn.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert("El carrito está vacío. Añade productos antes de comprar.");
        } else {
            const mensaje = `Hola, estoy interesado en realizar una compra.`;
            const numeroWhatsApp = "30185962"; // Reemplaza con tu número de WhatsApp
            const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensaje)}`;

            window.open(urlWhatsApp, '_blank'); // Abre WhatsApp en una nueva pestaña
        }
    });

});