export function contador(product) {
    let template = `
     <div class ="d-flex justify-content-center align-items-center gap-3 my-3">
           <button id= "decrementBtn-${product.id}" class= "btn btn-dark">-</button>
           <div>
           <span id="contador-${product.id}">1</span>
           </div>
           <button id= "incrementBtn-${product.id}" class= "btn btn-dark">+</button>
     </div>
    `; 

    return template;
}

export function addEventListeners(product, cantidad) {
    let btnIncrement = document.querySelector(`#incrementBtn-${product.id}`);
    let btnDecrement = document.querySelector(`#decrementBtn-${product.id}`);
    let spanContador = document.querySelector(`#contador-${product.id}`);
    
    btnIncrement.addEventListener('click', () => {
        spanContador.textContent = ++cantidad;
    });

    btnDecrement.addEventListener('click', () => {
        if (cantidad > 1) {
            spanContador.textContent = --cantidad;
        }
            spanContador.textContent = cantidad;
    });

}