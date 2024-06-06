const handleRenderRes = (arr) => {
     for (const product of arr) {
        const link = document.createElement("a");
        link.href = `/products/${product.product_id}`
        link.textContent = product.product_name;
        document.body.append(link)
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
getProducts()