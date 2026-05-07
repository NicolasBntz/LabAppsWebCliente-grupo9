import { getProducts } from "../services/api.js";
import { Modal } from "./modal.js";

export function RenderCards(products){
    let productList = document.querySelector('#product-list')
        let template= ' '; 
        products.forEach((p) => {
            template += `
                <div class="col">
                <div class="card h-100 shadow-sm tarjeta-efecto border-0">
                    
                    <img src="${p.image}" class="card-img-top p-3" alt="${p.title}" style="height: 250px; object-fit: contain;">
                    
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-truncate">${p.title}</h5>
                        
                        <div class="mt-auto pt-3">
                            <button class="btn btn-primary w-100" id="btn-${p.id}">Más detalles</button>
                        </div>
                    </div>
                </div>
            </div>
        `;    
        });
    
        productList.innerHTML = template;

        // Eventos onclick de los botones:
        products.forEach((p)=> {
            let btn = document.querySelector(`#btn-${p.id}`);
            btn.addEventListener('click', () => {
                Modal(p);
            });
        });

}