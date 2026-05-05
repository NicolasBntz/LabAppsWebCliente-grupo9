import { RenderCards } from "./components/cards.js";
import { initLocalStorage } from "./storage/storage.js";
import { cartList } from "./components/cart.js";

initLocalStorage();
RenderCards();

const openCartBtn = document.querySelector('[data-bs-target="#offcanvasRight"]');

if (openCartBtn) {
    openCartBtn.addEventListener('click', () => {
        cartList();
    });
}