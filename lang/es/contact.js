document.addEventListener('DOMContentLoaded', () =>{
    // Definimos las constantes para las claves en LocalStorage
    const carritoKey = "Carrito";   
    const carritoHTML = localStorage.getItem(carritoKey);
    const carrito = document.getElementById('carrito');
    const montoActual = document.getElementById('montoActual');
    if (carritoHTML){
        carrito.innerHTML = carritoHTML;
    } else {
        carrito.innerHTML = 'El carrito está vacío...'
    }
    let cantidadCarrito = carrito.children.length;
    const cantidadCarritoHTML = document.querySelector('.cantidadCarrito');
    console.log(cantidadCarritoHTML);
    if (cantidadCarrito == 0) {
        cantidadCarritoHTML.style.display = 'none';
    } else {
        cantidadCarritoHTML.style.display = 'block';
        cantidadCarritoHTML.textContent = cantidadCarrito;
    }
    const botonModal = document.getElementById('botonModal');
    // Actualizar el monto total
    actualizarMontoTotal();
    botonModal.addEventListener('click', quitarElemento());

    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        validateForm();
        alert('Mensaje Enviado Correctamente');
    });
    
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,7}$/;
        return regex.test(email);
    }
    
    function validateForm() {
        const emailInput = document.getElementById('exampleInputEmail1');
        const email = emailInput.value;
        if (!validateEmail(email)) {
            alert('Por favor ingrese un correo electrónico válido.');
        } else {
            alert('Correo electrónico enviado correctamente.');
        }
    }
    // Función para actualizar el monto total
    function actualizarMontoTotal() {
        const precios = document.querySelectorAll('#carrito .border h5'); // Obtener todos los precios de los libros en el carrito
        let total = 0;
        precios.forEach(precio => {
            const precioTexto = precio.textContent.replace('Precio: S/', ''); // Eliminar el texto 'Precio: S/' para obtener solo el número
            total += parseFloat(precioTexto); // Sumar el precio al total
        });
        montoActual.textContent = `Monto Actual: S/${total.toFixed(2)}`; // Mostrar el total en el elemento 'montoActual'
        localStorage.setItem('montoTotal', total.toFixed(2)); // Guardar el monto total en el LocalStorage
    } 
    const deleteAll = document.getElementById('deleteAll');
    deleteAll.addEventListener('click', quitarTodo);
    botonModal.addEventListener('click', quitarElemento);
    

    function quitarElemento() {
        const removeFromCartButtons = document.querySelectorAll('.removeFromCart');
        removeFromCartButtons.forEach(button => {
            button.addEventListener('click', () => {
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

    function quitarTodo() {
        carrito.innerHTML = '';
        cantidadCarrito = carrito.children.length;
                if (cantidadCarrito == 0) {
                    cantidadCarritoHTML.style.display = 'none';
                } else {
                    cantidadCarritoHTML.style.display = 'block';
                    cantidadCarritoHTML.textContent = cantidadCarrito;
                }
        // Actualizar el monto total
        actualizarMontoTotal();
        // Actualizar el contenido del carrito en LocalStorage
        const carritoInnerHTML = carrito.innerHTML;
        localStorage.setItem(carritoKey, carritoInnerHTML);
    }

});
