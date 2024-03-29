const express = require("express");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = 3500;
var jogadores = {
    primeiro: undefined,
    segundo: undefined,
};

//Dispadar evento quando jogador entrar na partida
io.on("connection", function (socket){
    if (jogadores.primeiro === undefined){
        jogadores.primeiro = socket.id;
    } else if (jogadores.segundo === undefined){
        jogadores.segundo = socket.id;
    }
    io.emit("jogadores", jogadores);
    console.log("+Lista de jogadores: %s", jogadores);

    // Sinalização de áudio: oferta
    socket.on("offer", (socketId, description) => {
        socket.to(socketId).emit("offer", socket.id, description);
    });

    // Sinalização de áudio: atendimento da oferta
    socket.on("answer", (socketId, description) => {
        socket.to(socketId).emit("answer", description);
    });

    // Sinalização de áudio: envio dos candidatos de caminho
    socket.on("candidate", (socketId, signal) => {
        socket.to(socketId).emit("candidate", signal);
    });

    //Disparar evento quando jogador sair da partida
    socket.on("disconnect", function(){
        if (jogadores.primeiro === socket.id) {
            jogadores.primeiro = undefined;
        }
        else if (jogadores.segundo === socket.id){
            jogadores.segundo = undefined;
        }
        io.emit("jogadores", jogadores);
        console.log("-Lista de jogadores: &s", jogadores);
    });

    socket.on("ganhou", function (socketId) {
        console.log("Ganhou:", socketId)
        socket.broadcast.emit("perdeu", socketId)
    })
});

app.use(express.static("./public"));
server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
