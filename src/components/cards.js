import { getProducts } from "../api.js";

export function RenderCards(){
    let productList = document.querySelector('#product-list')
    getProducts().then((products) => {
        let template= ' '; 
        products.forEach(p => {
            template += `
                <div class="col">
                    <div class="card" style="width: 300px;">  
                        <img src="${p.image}" class="card-img-top" alt="${p.title}">
                        <div class="card-body">
                             <h5 class="card-title">${p.title}</h5>
                             <p class="card-text">${p.description}</p>
                        </div>
                    </div>
                </div>
            `;    
        });
    
        productList.innerHTML = template;
    });
}