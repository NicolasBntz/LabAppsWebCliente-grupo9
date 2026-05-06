import { RenderCards } from "./components/cards.js";
import { initLocalStorage } from "./storage/storage.js";
import { cartList } from "./components/cart.js";
import { getProducts } from "./services/api.js";

initLocalStorage();
getProducts().then((products) => {
        let inputSearch = document.querySelector('#inputSearch');
        inputSearch.addEventListener('input', (event) => {
            console.log(event.target.value);
            let query = event.target.value;
            if (query !== '') { 
                let result = products.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));
                return RenderCards(result);
                
            }
    });
    RenderCards(products);
});
//RenderCards();

const openCartBtn = document.querySelector('[data-bs-target="#offcanvasRight"]');

if (openCartBtn) {
    openCartBtn.addEventListener('click', () => {
        cartList();
    });
}
