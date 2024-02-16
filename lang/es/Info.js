document.addEventListener('DOMContentLoaded', () =>{
    // Definimos las constantes para las claves en LocalStorage
    const carritoKey = "Carrito";   
    const carritoHTML = localStorage.getItem(carritoKey);
    const carrito = document.getElementById('carrito');
    const montoActual = document.getElementById('montoActual');
    carrito.innerHTML = carritoHTML;
    let cantidadCarrito = carrito.children.length;
    const cantidadCarritoHTML = document.querySelector('.cantidadCarrito');
    console.log(cantidadCarritoHTML);
    if (cantidadCarrito == 0) {
        cantidadCarritoHTML.style.display = 'none';
    } else {
        cantidadCarritoHTML.style.display = 'block';
        cantidadCarritoHTML.textContent = cantidadCarrito;
    }
    console.log(cantidadCarrito);
    const botonModal = document.getElementById('botonModal');
    // Actualizar el monto total
    actualizarMontoTotal();
    const libro = document.getElementById('libro');
    const libroHTML = localStorage.getItem('Info');
    libro.innerHTML = libroHTML;
    // Selecciona el elemento con el id "descripcionParrafo"
    const parrafo = document.querySelector('p');

    // Cambia el estilo display del párrafo para que sea "block" (visible)
    parrafo.style.display = "block";

    botonModal.addEventListener('click', quitarElemento());

    const addToCartButton = document.querySelector('.addToCart');
            addToCartButton.addEventListener('click', () => {
                    const libro = addToCartButton.closest('.libroInfo'); // Obtener el elemento padre .libroInfo
                    const titulo = libro.querySelector('.titulo').textContent;
                    const imagenSrc = libro.querySelector('img').src;
                    const precio = libro.querySelector('h5').textContent;
                    
                    const libroCarrito = document.createElement('div');
                    libroCarrito.classList.add('border');
                    libroCarrito.classList.add('border-3');
                    libroCarrito.classList.add('border-secondary');
                    libroCarrito.classList.add('p-3');
                    libroCarrito.classList.add('m-3');
                    libroCarrito.classList.add('d-flex');
                    libroCarrito.classList.add('flex-column');
                    libroCarrito.classList.add('align-items-center');
                    libroCarrito.innerHTML = `
                        <h3>${titulo}</h3>
                        <img src="${imagenSrc}">
                        <h5 style="margin: 10%">${precio}</h5>
                        <button type="button" class="btn btn-secondary removeFromCart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                        Quitar del carrito
                        </button>
                    `;
                    carrito.appendChild(libroCarrito);
                    alert(`Producto añadido al carrito correctamente`);
                    // Guardamos un valor en LocalStorage
                    const carritoInnerHTML = carrito.innerHTML;
                    localStorage.setItem(carritoKey, carritoInnerHTML);

                    cantidadCarrito = carrito.children.length;
                    if (cantidadCarrito == 0) {
                        cantidadCarritoHTML.style.display = 'none';
                    } else {
                        cantidadCarritoHTML.style.display = 'block';
                        cantidadCarritoHTML.textContent = cantidadCarrito;
                    }

                    // Actualizar el monto total
                    actualizarMontoTotal();
                    quitarElemento()
                    botonModal.addEventListener('click', quitarElemento());
                });

    // Función para actualizar el monto total
    function actualizarMontoTotal() {
        const precios = document.querySelectorAll('#carrito .border h5'); // Obtener todos los precios de los libros en el carrito
        let total = 0;
        precios.forEach(precio => {
            const precioTexto = precio.textContent.replace('Precio: S/', ''); // Eliminar el texto 'Precio: S/' para obtener solo el número
            total += parseFloat(precioTexto); // Sumar el precio al total
        });
        montoActual.textContent = `Monto Actual: S/${total.toFixed(2)}`; // Mostrar el total en el elemento 'montoActual'
    } 
    function quitarElemento() {
        const removeFromCartButtons = document.querySelectorAll('.removeFromCart');
            removeFromCartButtons.forEach(button => {
                button.addEventListener('click', () => {
                    console.log('hola');
                    const libroCarrito = button.closest('.border'); // Obtener el elemento padre .border
                    libroCarrito.remove();
                    
                    // Actualizar el contenido del carrito en LocalStorage
                    const carritoInnerHTML = carrito.innerHTML;
                    localStorage.setItem(carritoKey, carritoInnerHTML);

                    cantidadCarrito = carrito.children.length;
                    if (cantidadCarrito == 0) {
                        cantidadCarritoHTML.style.display = 'none';
                    } else {
                        cantidadCarritoHTML.style.display = 'block';
                        cantidadCarritoHTML.textContent = cantidadCarrito;
                    }

                    // Actualizar el monto total
                    actualizarMontoTotal();
                });
    });
    }
});
