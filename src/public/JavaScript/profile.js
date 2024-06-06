const elDelProfileBtn = document.querySelector(".js-del-profile-btn");
const elUserTemp = document.querySelector(".js-user-temp").content;
const elUserList = document.querySelector(".js-res");
const getProfileImage = async () => {
    const req = await fetch(`http://${IP}:4000/profile/image`, {
        method: "GET",
        headers: {
            "Content-type": "application/blob",
            token: getItem("application-token")
        }
    });
    const res = await req.blob();
    document.querySelector("#avatar").src = URL.createObjectURL(res)
};

const renderUser = (arr) => {
    for (const user of arr) {
        const clone = elUserTemp.cloneNode(true);
        clone.querySelector("#first").value = user.user_first_name;
        clone.querySelector("#last").value = user.user_last_name;
        clone.querySelector("#email").value = user.email; 
        elUserList.append(clone);
    }
};

const getProfile = async () => {
    try {
        const req = await fetch(`http://${IP}:4000/profile`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                token: getItem("application-token")
            }
        });
        const res = await req.json();
        renderUser([res]);
    } catch (error) {
        console.log(error);
    }
};
const userUpdate = async (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    const user = {
        user_first_name:evt.target.querySelector("#first").value,
        user_last_name: evt.target.querySelector("#last").value,
        email: evt.target.querySelector("#email").value,
        password: evt.target.querySelector("#password").value,
        confirm_password: evt.target.querySelector("#confirm_password").value
    };    
    for (const key in user) {
        if(user[key].length){
           formData.append(key, user[key]); 
        }
    }

    if(evt.target.querySelector("#avatar").files[0]){
        formData.append("avatar", evt.target.querySelector("#avatar").files[0]);  
    }
    const req = await fetch(`http://${IP}:4000/profile`, {
        method: "PUT",
        headers: {
            token: getItem("application-token")
        },
        body: formData
    });
    const res = await req.json();
    console.log(res)
}
elUserList.addEventListener("submit", userUpdate)
elDelProfileBtn.addEventListener("click", async (evt) => {
    const req = await fetch(`http://${IP}:4000/profile`, {
        method: "DELETE",
        headers:{
            token: getItem("application-token")
        }
    });
    const res = await req.json();
    if(res.statusCode == 200){
        window.localStorage.clear();
        window.location.replace("/register");
    } 
})
getProfile();
getProfileImage();