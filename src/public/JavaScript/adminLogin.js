const elForm = document.querySelector(".js-form");
const adminLogin = async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const req = await fetch(`http://${IP}:4000/auth/admin`, {
        method: "POST",
        body: formData
    })
    const res = await req.json();
    if(res.accessToken){
        const {accessToken} = res;
        setItem("application-token", accessToken);
        window.location.replace("/admin");
    }
}
elForm.addEventListener("submit", adminLogin)
// Elyorbek
// @khujamov_1