import { RenderCards } from "./components/cards.js";
import { initLocalStorage } from "./storage/storage.js";
import { cartList } from "./components/cart.js";
import { getProducts } from "./services/api.js";
import { filterProducts } from "./utils/category-filters.js";

initLocalStorage();
getProducts().then((products) => {
        let inputSearch = document.querySelector('#inputSearch');
        
        //Estado de filtros:
        let currentCategory = null;
        let currentQuery = '';

        function updateView(){
            const filtered = filterProducts(products,{
                category: currentCategory,
                query: currentQuery
            });

            RenderCards(filtered);
        }

        function setupCategory(selector, category = null){
            const el = document.querySelector(selector);
            el.addEventListener('click', (e) => {
                e.preventDefault();
                currentCategory = category;
                updateView();
            });
        }

        // Categorías:

        setupCategory('#home');
        setupCategory('#electronics', 'electronics');
        setupCategory('#jewelery', 'jewelery');
        setupCategory('#mens-clothing', "men's clothing");
        setupCategory('#womens-clothing', "women's clothing");

        // Busqueda:
        if (inputSearch){
            inputSearch.addEventListener('input', (event) => {
                currentQuery = event.target.value;
                updateView();
            });
        }
        
    //Render inicial:
    updateView();
});

// Carrito:

const openCartBtn = document.querySelector('[data-bs-target="#offcanvasRight"]');

if (openCartBtn) {
    openCartBtn.addEventListener('click', () => {
        cartList();
    });
}
