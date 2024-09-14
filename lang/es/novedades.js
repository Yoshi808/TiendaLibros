document.addEventListener('DOMContentLoaded', () => {
    // Definimos las constantes para las claves en LocalStorage
    const carritoKey = "Carrito";
    const carritoHTML = localStorage.getItem(carritoKey);
    const libros = document.getElementById('libros');
    const carrito = document.getElementById('carrito');
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
    const maxResults = 20;
    const botonModal = document.getElementById('botonModal');

    botonModal.addEventListener('click', quitarElemento());
    // Actualizar el monto total
    actualizarMontoTotal();
    


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
    fetch(`https://www.googleapis.com/books/v1/volumes?q=Chat+GPT&maxResults=${maxResults}&langRestrict=es`)
    .then(response => response.json())
    .then(data => {
        data.items.forEach(libro => {
            const listaLibros = document.createElement('div');
            listaLibros.classList.add('libroInfo');
            listaLibros.classList.add('border');
            listaLibros.classList.add('border-3');
            listaLibros.classList.add('border-secondary');
            listaLibros.classList.add('rounded');
            listaLibros.classList.add('shadow');
            listaLibros.innerHTML = libro.saleInfo.listPrice ? `
                    <h2 class="titulo">${libro.volumeInfo.title}</h2>
                    <a class="imageLink" href="info.html"><img src="${libro.volumeInfo.imageLinks ? libro.volumeInfo.imageLinks.thumbnail : 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTMVlVIwSSng1xnNT7GR_c91cjMKxlfVhwFuo_Z-tUw2en6u5Rg'}"></a>
                    <h4>Autores: ${libro.volumeInfo.authors ? libro.volumeInfo.authors : 'Desconocidos'} (${libro.volumeInfo.publishedDate ? libro.volumeInfo.publishedDate : 'Fecha desconocida'})</h4>
                    ${libro.volumeInfo.description || libro.volumeInfo.subtitle ? `<p class="description"><strong>Descripción: </strong>${libro.volumeInfo.description || libro.volumeInfo.subtitle}</p>` : ''}
                    <div class="venta">
                    <h5 style="margin: 10%">Precio: S/${libro.saleInfo.listPrice.amount}</h5>
                        <button class="btn btn-outline-success addToCart" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16"> <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/> <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg> Añadir al carrito</button>
                    </div>
                    ` : `
                    <h2 class="titulo">${libro.volumeInfo.title}</h2>
                    <a class="imageLink" href="info.html"><img src="${libro.volumeInfo.imageLinks ? libro.volumeInfo.imageLinks.thumbnail : 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTMVlVIwSSng1xnNT7GR_c91cjMKxlfVhwFuo_Z-tUw2en6u5Rg'}"></a>
                    <h4>Autores: ${libro.volumeInfo.authors ? libro.volumeInfo.authors : 'Desconocidos'} (${libro.volumeInfo.publishedDate ? libro.volumeInfo.publishedDate : 'Fecha desconocida'})</h4>
                    ${libro.volumeInfo.description || libro.volumeInfo.subtitle ? `<p style="display: none"><strong>Descripción: </strong>${libro.volumeInfo.description || libro.volumeInfo.subtitle}</p>` : ''}
                    <div class="venta">
                    <h5 style="margin: 10%">Agotado</h5>
                        <button class="btn btn-danger addToCart" disabled  type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16"> <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/> <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg> Añadir al carrito</button>
                    </div>
                `;
                const imageLink = document.querySelectorAll('.imageLink');
                imageLink.forEach(image => {
                    image.addEventListener('click', () => {
                        const libro = image.closest('.libroInfo');
                        localStorage.setItem('Info', libro.innerHTML);
                    });
                });
                libros.appendChild(listaLibros);
        });
        const addToCartButtons = document.querySelectorAll('.addToCart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const libro = button.closest('.libroInfo'); // Obtener el elemento padre .libroInfo
                    const titulo = libro.querySelector('h2').textContent;
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
                    libroCarrito.classList.add('rounded');
                    libroCarrito.classList.add('shadow');
                    libroCarrito.innerHTML = `
                        <h2>${titulo}</h2>
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
                    cantidadCarrito = carrito.children.length;
                    if (cantidadCarrito == 0) {
                        cantidadCarritoHTML.style.display = 'none';
                    } else {
                        cantidadCarritoHTML.style.display = 'block';
                        cantidadCarritoHTML.textContent = cantidadCarrito;
                    }
                    // Guardamos un valor en LocalStorage
                    const carritoInnerHTML = carrito.innerHTML;
                    localStorage.setItem(carritoKey, carritoInnerHTML);
                    // Actualizar el monto total
                    actualizarMontoTotal();
                    quitarElemento()
                });
            });
    })
    .catch(error => {
        libros.innerHTML = `Error: ${error}`
        console.error('Error: ', error);
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
        localStorage.setItem('montoTotal', total.toFixed(2)); // Guardar el monto total en el LocalStorage
    }
});
