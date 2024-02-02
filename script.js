document.addEventListener('DOMContentLoaded', () => {
    const libros = document.getElementById('libros');
    const searchForm = document.getElementById('searchForm');
    const genero = document.getElementById('genero');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const input = document.getElementById('busqueda');
        const busqueda = input.value.trim();
        genero.textContent = `${busqueda}:`
        libros.innerHTML = '';
        getBooks(busqueda);
    })
    
    const maxResults = 20;

    function getBooks(valor) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${valor}&maxResults=${maxResults}&langRestrict=es`)
        .then(response => response.json())
        .then(data => {
            
            data.items.forEach(libro => {
                const listaLibros = document.createElement('div');
                listaLibros.classList.add('libroInfo')
                listaLibros.innerHTML = libro.saleInfo.listPrice ? `
                <h2>${libro.volumeInfo.title}</h2>
                <img src="${libro.volumeInfo.imageLinks.thumbnail}">
                <h4>Autores: ${libro.volumeInfo.authors} (${libro.volumeInfo.publishedDate})</h4>
                <p>Descripción: ${libro.volumeInfo.description}</p>
                <div class="venta">
                <h5 style="margin: 10%">Precio: S/${libro.saleInfo.listPrice.amount}</h5>
                    <button class="btn btn-outline-success addToCart" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16"> <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/> <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg> Añadir al carrito</button>
                </div>
                ` : `
                <h2>${libro.volumeInfo.title}</h2>
                <img src="${libro.volumeInfo.imageLinks.thumbnail}">
                <h4>Autores: ${libro.volumeInfo.authors} (${libro.volumeInfo.publishedDate})</h4>
                <p>Descripción: ${libro.volumeInfo.description}</p>
                <div class="venta">
                <h5 style="margin: 10%">Precio: Gratis</h5>
                    <button class="btn btn-outline-success addToCart" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16"> <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/> <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg> Añadir al carrito</button>
                </div>
                `;
                libros.appendChild(listaLibros);
            });
            const addToCartButtons = document.querySelectorAll('.addToCart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', () => {alert('Producto añadido al carrito correctamente')})
            })
        })
        .catch(error => {
            libros.innerHTML = `Error: ${error}`
            console.error('Error: ', error);
        });
    }
})