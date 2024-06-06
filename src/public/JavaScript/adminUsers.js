const handleRenderRes = (arr) => {
    for (const user of arr) {
        const link = document.createElement("a");
        link.href = `/users/${user.user_id}`
        link.textContent = user.user_first_name;
        document.body.append(link)
    }
}
const getUsers = async () => {
    const req = await fetch(`http://${IP}:4000/users`, {
        method: "GET",
        headers: {
            token: getItem("application-token")
        }
    });
    const res = await req.json();
    if(res.length) return handleRenderRes(res)
}
getUsers()