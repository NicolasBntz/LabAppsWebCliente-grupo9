const STORAGE_KEY = 'cart';

export function initLocalStorage() {

    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
}

export function getFromLocalStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveToLocalStorage(item){
    let cart = getFromLocalStorage();
    cart.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function setItemLocalStorage(item){
     localStorage.setItem(STORAGE_KEY, JSON.stringify(item));
}

export function updateItemLocalStorage(itemId, qtty){
     let dataStorage = getFromLocalStorage();
     let idx = dataStorage.findIndex((product) => product.id === itemId);
     if (idx != -1) 
        { 
            dataStorage[idx].qtty = parseInt(dataStorage[idx].qtty) + parseInt(qtty);
            setItemLocalStorage(dataStorage);
        }
     return idx;

}

export function deleteItemLocalStorage(itemId){
      let productsStorage = getFromLocalStorage();
      let newDataStorage = productsStorage.filter((p) => p.id !== itemId);
      setItemLocalStorage(newDataStorage);

}