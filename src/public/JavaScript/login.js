const elForm = document.querySelector(".js-form");
const loginUser = async (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("email", email.value);
    formData.append("password", password.value);
    const req = await fetch(`http://${IP}:4000/auth/login`, {
        method: "POST",
        body: formData
    })
    const res = await req.json();
    console.log(res)
    if(res.accessToken){
        const {accessToken, user} = res;
        setItem("application-token", accessToken);
        setItem("application-user", JSON.stringify(user))
        window.location.replace("/")
    }
};
elForm.addEventListener("submit", loginUser)
toCheckTokenSign(getItem("application-token"));