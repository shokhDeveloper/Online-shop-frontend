const elForm = document.querySelector(".js-form");
const elCategoriesList = document.querySelector(".js-categories");
const renderCategories = (categories) => {
    for (const category of categories) {
        const elCategory = document.createElement("label");
        elCategory.for = category.category_name;
        elCategory.textContent = category.category_name
        const elRadio = document.createElement("input");
        elRadio.type = "radio";
        elRadio.id = category.category_name;
        elRadio.value = category.category_id
        elRadio.id = "category_id";
        elRadio.name = "category_id"
        elCategory.append(elRadio)
        elCategoriesList.append(elCategory)
    }
}
const getCategories = async () => {
    const req = await fetch(`http://${IP}:4000/categories`, {
        method: "GET",
        headers: {
            token: getItem("application-token")
        }  
    })
    const res = await req.json();
    if(res.length) return renderCategories(res)
}
const addProduct = async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const req = await fetch(`http://${IP}:4000/products/add`, {
        method: "POST",
        headers:{
            token: getItem("application-token")
        },
        body: formData
    })
    const res = await req.json();
    if(res.statusCode == 201) window.location.replace("/products");
}
getCategories();
elForm.addEventListener("submit", addProduct)