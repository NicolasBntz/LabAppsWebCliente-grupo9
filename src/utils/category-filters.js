export function filterProducts(products, {category = null, query= ''} = {}) {
    let result = [...products];

    if (category) {
        result = result.filter(p => p.category === category);
    }

    if (query) {
        result = result.filter(p => 
            p.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    return result;
}