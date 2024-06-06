const id = window.location.href.split("/").pop();
const getProductImage = async () => {
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
        link.href = `/products/${product.product_id}`
        link.textContent = product.product_name;
        const img = document.createElement("img");
        img.src = await getProductImage()
        img.width = 200;
        img.height = 200;
        const elDelBtn = document.createElement("button");
        elDelBtn.textContent = "O'chirish";
        elDelBtn.dataset.id = product.product_id
        elDelBtn.classList.add("js-del-btn");
        const elEditLink = document.createElement("a");
        elEditLink.textContent = 'Edit product';
        elEditLink.href = `/edit-product/${id}`;
        document.body.append(link, img, elDelBtn, elEditLink);
    }
}
const getProducts = async () => {
    const req = await fetch(`http://${IP}:4000/products/${id}`, {
        method: "GET",
        headers: {
            token: getItem("application-token")
        }
    });
    const res = await req.json();
    if(res.length) return handleRenderRes(res)
}
window.addEventListener("click", async (evt) => {
    if(evt.target.matches(".js-del-btn")){
        const id = evt.target.dataset.id;   
        const req = await fetch(`http://${IP}:4000/products/${id}`, {
            method: "DELETE",
            headers: {
                token: getItem("application-token")
            }
        })
        const res = await req.json();
        console.log(res)
    }
})
getProducts()