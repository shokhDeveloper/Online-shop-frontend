const id = location.href.split("/").pop();
const elForm = document.querySelector(".js-form");
const elCategoriesList = document.querySelector(".js-categories");
const getProduct = async () => {
  const req = await fetch(`http://${IP}:4000/products/${id}`, {
    method: "GET",
    headers: {
      token: getItem("application-token"),
    },
  });
  const res = await req.json();
  if (res.length) return handleRenderRes(res);
};
const renderCategories = (categories) => {
  for (const category of categories) {
    const elCategory = document.createElement("label");
    elCategory.for = category.category_name;
    elCategory.textContent = category.category_name;
    const elRadio = document.createElement("input");
    elRadio.classList.add("category");
    elRadio.type = "radio";
    elRadio.id = category.category_name;
    elRadio.value = category.category_id;
    elRadio.name = "category_id"
    elRadio.dataset.id = category.category_name;
    elCategory.append(elRadio);
    elCategoriesList.append(elCategory);
  }
};
const getCategories = async () => {
  const req = await fetch(`http://${IP}:4000/categories`, {
    method: "GET",
    headers: {
      token: getItem("application-token"),
    },
  });
  const res = await req.json();
  if (res.length) renderCategories(res);
  getProduct();
};
const handleRenderRes = (arr) => {
  for (const product of arr) {
    elForm.querySelector("#product_name").value = product.product_name;
    elForm.querySelector("#product_price").value = product.product_price;
  }
  const [product] = arr;
  console.log(product);
  const elRadios = elCategoriesList.querySelectorAll(".category");
  elRadios.forEach(radio => {
    console.log(radio.dataset.id, product.category_id)
      if(product.category_id == radio.dataset.id){
        radio.checked = true
      }else{
        console.log("yuq")
      }
  })
};
const editProduct = async (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const req = await fetch(`http://${IP}:4000/products/${id}`,{
    method: "PUT",
    headers: {
        token: getItem("application-token")
    },
    body: formData
  })  
  const res = await req.json();
  console.log(res)
};
elForm.addEventListener("submit", editProduct);
getCategories();
