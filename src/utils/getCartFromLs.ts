


export const getCartFromLs = () => {
    const data = localStorage.getItem("cart");
    const items = data ? JSON.parse(data) : [];//если в корзине естьл чтото то спарси это 
}