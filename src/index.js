import { RenderCards } from "./components/cards.js";
import { initLocalStorage } from "./storage/storage.js";
import { cartList } from "./components/cart.js";
import { getProducts } from "./services/api.js";

initLocalStorage();
getProducts().then((products) => {
        let inputSearch = document.querySelector('#inputSearch');
        
        let home= document.querySelector('#home');
        home.addEventListener('click', () => {
            return RenderCards(products);
        });

        let electronics = document.querySelector('#electronics');
        electronics.addEventListener('click', () => {
            let result = products.filter((p) => p.category == 'electronics');
            return RenderCards(result);
        });

        let jewelery = document.querySelector('#jewelery');
        jewelery.addEventListener('click', () => {
            let result = products.filter((p) => p.category == 'jewelery');
            return RenderCards(result);
        });

        let mens_clothing = document.querySelector('#mens-clothing');
        mens_clothing.addEventListener('click', () => {
            let result = products.filter((p) => p.category == "men's clothing");
            return RenderCards(result);
        });

        let womens_clothing = document.querySelector('#womens-clothing');
        womens_clothing.addEventListener('click', () => {
            let result = products.filter((p) => p.category == "women's clothing");
            return RenderCards(result);
        });

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
