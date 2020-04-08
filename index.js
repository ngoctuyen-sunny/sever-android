const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

// khai báo từ admin
const adminRoute = require('./routes/admin');
// khai báo từ routes/loaisanpham
const loaisanpham = require('./routes/loaisanpham');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//lấy các tài nguyên từ public
app.use("/public", express.static("public"));
app.use(express.static('uploads'));
app.use(adminRoute);
app.use(loaisanpham);

// kết nối với MongoDB
const connectDB = require("./config/database");
connectDB();


// cấu hình express-handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
// màn hình quản lý người dùng
app.get('/quanlynguoidung', function(req, res) {
    res.render('QuanLyNguoiDung');
});

// // màn hình quản lý sản phẩm
app.get('/quanlysanpham', function(req, res) {
    res.render('QuanLySanPham');
});
// localhost 
app.listen(port, () => console.log(`Example app listening on port ${port}!`));