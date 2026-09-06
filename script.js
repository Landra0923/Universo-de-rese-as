document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-input');
  const bookItems = document.querySelectorAll('.book-item');
  const shelves = document.querySelectorAll('.shelf');

  // Crear mensaje de "Sin resultados" dinámicamente
  const noResultsMsg = document.createElement('p');
  noResultsMsg.className = 'no-results-msg';
  noResultsMsg.textContent = 'No se encontraron libros o autores que coincidan con tu búsqueda.';
  noResultsMsg.style.display = 'none';
  noResultsMsg.style.textAlign = 'center';
  noResultsMsg.style.color = 'var(--text-muted)';
  noResultsMsg.style.fontSize = '1.1rem';
  noResultsMsg.style.margin = '2rem 0';
  
  const bookcase = document.querySelector('.bookcase');
  if (bookcase) {
    bookcase.parentNode.insertBefore(noResultsMsg, bookcase.nextSibling);
  }

  // Evento de escucha al escribir en el buscador
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    let totalVisibleBooks = 0;

    bookItems.forEach(item => {
      const img = item.querySelector('.cover-img');
      const title = img ? img.getAttribute('alt').toLowerCase() : '';
      const author = item.getAttribute('data-author') ? item.getAttribute('data-author').toLowerCase() : '';

      // Comprobar si coincide con el título o el autor
      if (title.includes(searchTerm) || author.includes(searchTerm)) {
        item.style.display = 'block';
        totalVisibleBooks++;
      } else {
        item.style.display = 'none';
      }
    });

    // Ocultar la tabla de madera (.shelf-wood) si la repisa queda vacía
    shelves.forEach(shelf => {
      const visibleInShelf = shelf.querySelectorAll('.book-item[style*="display: block"]').length;
      const shelfWood = shelf.nextElementSibling;

      // Si no se está buscando nada, mostrar todo
      if (searchTerm === '') {
        shelf.style.display = 'flex';
        if (shelfWood && shelfWood.classList.contains('shelf-wood')) {
          shelfWood.style.display = 'block';
        }
      } else if (visibleInShelf === 0) {
        shelf.style.display = 'none';
        if (shelfWood && shelfWood.classList.contains('shelf-wood')) {
          shelfWood.style.display = 'none';
        }
      } else {
        shelf.style.display = 'flex';
        if (shelfWood && shelfWood.classList.contains('shelf-wood')) {
          shelfWood.style.display = 'block';
        }
      }
    });

    // Mostrar u ocultar el mensaje de "Sin resultados"
    if (totalVisibleBooks === 0 && searchTerm !== '') {
      noResultsMsg.style.display = 'block';
    } else {
      noResultsMsg.style.display = 'none';
    }
  });
});