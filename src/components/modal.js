import { getFromLocalStorage, saveToLocalStorage, setItemLocalStorage, } from "../storage/storage.js";
import { addEventListeners ,contador } from "./contador.js";

export function Modal(product){
    let container = document.querySelector('#productModal');
    let template = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">${product.title}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-6">
                    <img src="${product.image}" class="img-fluid" alt="${product.title}">
                </div>
                <div class="col-md-6">
                    <p>${product.description}</p>
                </div>
                <div class="col-12 d-flex justify-content-end align-items-start">
                <p style="width: 150px;">
                    Precio: <small> USD $${product.price}</small>
                </p>
                </div>
                ${contador(product)}
            </div>
        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="addToCartBtn-${product.id}">Agregar al carrito</button>
      </div>
    </div>
    `;

    container.innerHTML = template;

    addEventListeners(product, 1);

    let btnAddToCart = document.querySelector(`#addToCartBtn-${product.id}`);
    btnAddToCart.addEventListener('click', () => {
        product.qtty = parseInt(document.querySelector(`#contador-${product.id}`).textContent);
        let dataStorage = getFromLocalStorage();
        let filtered = dataStorage.filter((p) => p.id !== product.id);
        filtered.push(product);
        setItemLocalStorage(filtered);

    });

    const bootstrapModal = new bootstrap.Modal(container);
    bootstrapModal.show();
}