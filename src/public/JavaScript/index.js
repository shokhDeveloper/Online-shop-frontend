const token = getItem("application-token");
const user = JSON.parse(getItem("application-user"));
const elPaymentLink = document.querySelector(".js-link-payment")
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
        price.textContent = product.product_price + "$";
        const img = document.createElement("img");
        img.src = await getProductImage(product.product_id)
        img.width = 200;
        img.height = 200;
        let shopBtn = document.createElement("button");
        shopBtn.classList.add("js-shop-btn");
        shopBtn.dataset.id = product.product_id;
        shopBtn.textContent = "Sotib olish";
        document.body.append(link, img, price, shopBtn);
    }
}
const getProducts = async () => {
    const req = await fetch(`http://${IP}:4000/products`, {
        method: "GET",
        headers: {
            token: getItem("application-token")
        }
    });
    const res = await req.json();
    if(res.length) return handleRenderRes(res)
}
const showPaymentLink = (type) => {
    console.log(type)
    if(type) elPaymentLink.classList.remove("hide");
    if(!type) elPaymentLink.classList.add("hide")
}
const getUserShops = async () => {
    const req = await fetch(`http://${IP}:4000/shops/${user.user_id}`, {
        method: "GET",
        headers: {
            token,
        }
    });
    const res = await req.json();
    console.log(res)
    if(res.length) showPaymentLink(true)
    if(!res.length) showPaymentLink(false)
}   
const shopProducts = async (evt) => {
    if(evt.target.matches(".js-shop-btn")){
        const id = evt.target.dataset.id;
        const req = await fetch(`http://${IP}:4000/shops/${id}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                token: getItem("application-token")
            }
        });
        const res = await req.json();
        if(res) getUserShops()
    }
}
window.addEventListener("click", shopProducts)
toCheckToken(token)
getProducts()
getUserShops();