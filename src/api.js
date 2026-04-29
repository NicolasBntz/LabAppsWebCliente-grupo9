export function getProducts(){
    let res = fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => console.log(data));
    return res;    
}

