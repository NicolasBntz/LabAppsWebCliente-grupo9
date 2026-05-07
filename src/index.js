import { RenderCards } from "./components/cards.js";
import { initLocalStorage, clearLocalStorage, getFromLocalStorage } from "./storage/storage.js";
import { cartList } from "./components/cart.js";
import { toast } from "./components/toast.js";
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

// Lógica para vaciar carrito con confirmación:
const confirmClearBtn = document.querySelector('#confirm-clear-btn');
if (confirmClearBtn) {
    confirmClearBtn.addEventListener('click', () => {
        clearLocalStorage();
        cartList();
        toast('Carrito vaciado con éxito', 'warning');
        
        const modalEl = document.getElementById('confirmClearCartModal');
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) modalInstance.hide();
    });
}

// Lógica para finalizar compra:
const checkoutBtn = document.querySelector('#checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        const cart = getFromLocalStorage();
        const total = cart.reduce((acc, item) => acc + (item.price * item.qtty), 0);
        const totalEl = document.getElementById('checkout-total');
        if (totalEl) {
            totalEl.innerText = `Total a pagar: $${total.toFixed(2)}`;
        }
    });
}

const confirmCheckoutBtn = document.querySelector('#confirm-checkout-btn');
if (confirmCheckoutBtn) {
    confirmCheckoutBtn.addEventListener('click', () => {
        const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        
        clearLocalStorage();
        cartList(); // Limpia la vista del carrito
        
        toast(`Compra confirmada con ${selectedMethod}. ¡Gracias por elegirnos!`, 'success');

        const modalEl = document.getElementById('checkoutModal');
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) modalInstance.hide();
    });
}

// Modo oscuro:
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement; 

const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-bs-theme', savedTheme);
actualizarIcono(savedTheme);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        actualizarIcono(newTheme);
    });
}

function actualizarIcono(theme) {
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.className = 'bi bi-sun-fill'; 
        } else {
            themeIcon.className = 'bi bi-moon-stars-fill'; 
        }
    }
}