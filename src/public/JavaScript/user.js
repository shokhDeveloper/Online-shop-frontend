const id = location.href.split("/").pop();
const getUserImage = async () => {
    const req = await fetch(`http://${IP}:4000/users/${id}/image`, {
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
    for (const user of arr) {
        const link = document.createElement("p");
        link.href = `/users/${user.user_id}`
        link.textContent = user.user_first_name + " " + user.user_last_name;
        const img = document.createElement("img");
        img.src = await getUserImage()
        img.width = 200;
        img.height = 200;
        document.body.append(link, img)
    }
}
const getUsers = async () => {
    const req = await fetch(`http://${IP}:4000/users/${id}`, {
        method: "GET",
        headers: {
            token: getItem("application-token")
        }
    });
    const res = await req.json();
    if(res.length) return handleRenderRes(res)
}
getUsers()