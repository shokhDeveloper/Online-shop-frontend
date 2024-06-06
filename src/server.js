import ejs from "ejs";
import path from "node:path";
import express from "express";
import { serverConfiguration } from "#config"; 
const {PORT, ip} = serverConfiguration;
const app = express();
app.use(express.static(path.join(process.cwd(), "src", "public", "JavaScript")))

// ejs configuration 
app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "public", "views"));

// Auth routes
app.get("/login", (_, res) => res.render("login.ejs"));
app.get("/register", (_, res) => res.render("register.ejs"));
app.get("/admin-login", (_, res) => res.render("adminLogin.ejs"));

// admin routes 
app.get("/admin", (_, res) => res.render("admin.ejs"));
app.get("/users", (_, res) => res.render("adminUsers.ejs"));
app.get("/products", (_, res) => res.render("products.ejs"));
app.get("/users/:userId", (_, res) => res.render("user.ejs"));
app.get("/add-product", (_, res) => res.render("addProduct.ejs"));
app.get("/admin/profile", (_, res) => res.render("adminProfile.ejs"));
app.get("/products/:productId", (_, res) => res.render("product.ejs"));
app.get("/edit-product/:productId", (_, res) => res.render("editProduct.ejs"));
app.get("/admin/profile", (_, res) => res.render("adminProfile.ejs"));
app.get("/shop-payment", (_, res) => res.render("shopPayment.ejs"));
// Client routes
app.get("/", (_, res) => res.render("index.ejs"));
app.get("/profile", (_, res) => res.render("profile.ejs"));

app.listen(PORT, () => {
    console.log(`Frontend server is running http://${ip}:${PORT}`);
});

// admin users
// admin users/:userId
// admin products
// admin add products
// admin products/:product