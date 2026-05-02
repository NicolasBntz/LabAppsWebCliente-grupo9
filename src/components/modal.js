export function Modal(product){
    let container = document.querySelector('#productModal');
    let template = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">${product.title}}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-6">
                    <img-src "${product.image}" class="img-fluid" alt="${product.title}">
                </div>
                <div class="col-md-6">
                    <p>${product.description}</p>
                </div>
                <div class="col-12 d-flex justify-content-end align-items-start">
                <p style="width: 150px;">
                    Precio: <small> USD $${product.price}</small>
                </p>
                </div>
            </div>
        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary">Agregar al carrito</button>
      </div>
    </div>
    `;

    container.innerHTML = template;

    const bootstrapModal = new bootstrapModal.Modal(container);
    bootstrapModal.show();
}