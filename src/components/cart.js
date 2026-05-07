import {getFromLocalStorage, setItemLocalStorage, deleteItemLocalStorage} from '../storage/storage.js';
import { toast } from './toast.js';

export function cartList() {
    let offcanvasbody = document.querySelector('#offcanvasRight .offcanvas-body');
    let template = '';
    let dataStorage = getFromLocalStorage();
     

    // Si el carrito está vacío, mostramos un mensaje
    if (dataStorage.length === 0) {
        offcanvasbody.innerHTML = '<p class="text-center">No hay productos en el carrito.</p>';
        return;
    }

    dataStorage.forEach((item) => {
        template += `
            <div class="card mb-3 tarjeta-efecto border-0" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4 d-flex align-items-center justify-content-center">
                        <img src="${item.image}" class="img-fluid rounded-start" style="height: 80px; object-fit: contain;" alt="${item.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title" style="font-size: 0.85rem;">${item.title}</h5>
                            <p class="card-text mb-1">Cantidad: ${item.qtty}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted">$${item.price}</small>
                                <button class="btn btn-outline-danger btn-sm border-0" data-id="${item.id}">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    offcanvasbody.innerHTML = template;
    eventsOnClick(dataStorage);
}

function eventsOnClick(productsStorage){
        productsStorage.forEach((item) => {
            let btn = document.querySelector(`button[data-id="${item.id}"]`);
            btn.addEventListener('click', () => {
                deleteItemLocalStorage(item.id);
                toast(`${item.title} eliminado del carrito`, 'danger');
                cartList();
            });
        });
    }