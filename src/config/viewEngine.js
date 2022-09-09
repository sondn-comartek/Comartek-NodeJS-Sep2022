    import express from "express";

    let configViewEngine = (app) => {
        // Cho phép phía client lấy các tài nguyên nằm trong thư mực public
        app.use(express.static("./src/public"));
        // Hỗ trợ các câu lệnh logic trong file HTML
        app.set("view engine", "ejs");
        // Quy định đường dẫn các views đều xuất phát từ folder src/views
        app.set("views", "./src/views")
    }

    module.exports = configViewEngine;