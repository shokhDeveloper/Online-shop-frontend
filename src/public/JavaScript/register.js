const elForm = document.querySelector(".js-form");
const userRegister = async (evt) => {
    evt.preventDefault();
    try{
        const user = {
            user_first_name: user_first_name.value,
            user_last_name: user_last_name.value,
            email: email.value,
            password: password.value,
            confirm_password: confirm_password.value 
        };
        const type = Object.values(user).some(val => !val.length);
        if(type) throw new Error("All values are mandatory !");
        const formData = new FormData();
        formData.append("user_first_name", user_first_name.value);
        formData.append("user_last_name", user_last_name.value);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("confirm_password", user.confirm_password)
        if(avatar.files[0]){
            formData.append("avatar", avatar.files[0]);
        };
        const req = await fetch(`http://${IP}:4000/auth/register`, {
            method: "POST",
            body: formData
        })
        const res = await req.json();
        if(res.accessToken){
            const {accessToken, user} = res;
            setItem("application-token", accessToken);
            setItem("application-user", JSON.stringify(user))
            window.location.replace("/")
        }
    }catch(error){
        console.log(error);
    }
}
elForm.addEventListener("submit", userRegister)
toCheckTokenSign(getItem("application-token"))