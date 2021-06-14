const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.set("view engine", "ejs");3

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});


io.on("connection", (socket) => {

    socket.on("disconnect", () => {
        console.log("X desconectou: " + socket.id);
    })

    socket.on("msg", (data) => {
        io.emit("showmsg", data);
        console.log(data);
    });

});

http.listen(4000, () => {
    console.log("servidor rodando com exito")
})