const elForm = document.querySelector(".js-form");
const elImage = document.querySelector("#admin_profile_image");
const getImage = async () => {
    const req = await fetch(`http://${IP}:4000/admins/image`, {
        method: "GET",
        headers: {
            "Content-type": "application/blob",
            token: getItem("application-token")
        }
    });
    const res = await req.blob();
    return URL.createObjectURL(res);
}
const renderAdminData = async ([user]) => {
    const {admin_username} = user
    elForm.querySelector("#admin_username").value = admin_username;
   elImage.src = await getImage();
}
const getAdmin = async () => {
    const req = await fetch(`http://${IP}:4000/admins`, {
        method: "GET",
        headers: {
            token: getItem("application-token")
        }
    });
    const res = await req.json();
    if(res.length) return renderAdminData(res)
}
const adminUpdateProfile = async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const req = await fetch(`http://${IP}:4000/admins`, {
        method: "PUT",
        headers: {
            token: getItem("application-token")
        },
        body: formData
    });
    const res = await req.json();
    console.log(res);
}
elForm.addEventListener("submit", adminUpdateProfile)
getAdmin();