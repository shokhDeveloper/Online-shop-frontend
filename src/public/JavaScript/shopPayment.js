const token = getItem("application-token");
const user = JSON.parse(getItem("application-user"));
const getProductImage = async (id) => {
    const req = await fetch(`http://${IP}:4000/products/${id}/image`, {
        method: "GET",
        headers: {
            "Content-type": "application/blob",
            token: getItem("application-token")
        } 
    });
    const res = await req.blob();
    return URL.createObjectURL(res)
}
const handleRenderRes = async (arr) => {
    for (const product of arr) {
        const link = document.createElement("p");
        link.textContent = product.product_name;
        const price = document.createElement("p");
        price.textContent = product.price + "$";
        const img = document.createElement("img");
        img.src = await getProductImage(product.product_id)
        img.width = 200;
        img.height = 200;
        let shopBtn = document.createElement("button");
        shopBtn.classList.add("js-del-btn");
        shopBtn.dataset.id = product.shop_id;
        shopBtn.textContent = "O'chirish";
        document.body.append(link, img, price, shopBtn);
    }
}
const getUserShops = async () => {
    const req = await fetch(`http://${IP}:4000/shops/${user.user_id}`, {
        method: "GET",
        headers: {
            token,
        }
    });
    const res = await req.json();
    if(res.length) handleRenderRes(res)
}   
const shopProducts = async (evt) => {
    if(evt.target.matches(".js-del-btn")){
        const id = evt.target.dataset.id;
        const req = await fetch(`http://${IP}:4000/shops/${id}`, {
            method: "DELETE",
            headers: {
                token: getItem("application-token")
            }
        });
        const res = await req.json();
        if(res) getUserShops()
        console.log(res)
    }
}
window.addEventListener("click", shopProducts)
getUserShops()