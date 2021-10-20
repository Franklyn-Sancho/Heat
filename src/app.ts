import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import {Server} from "socket.io";
import {router} from "./routes"

const app = express();
app.use(cors());

//Subirá o server
const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
});


//configuraçao do Socker.io
io.on("connection", socket => {
    console.log(`Usuário conectado no ${socket}`)
})

app.use(express.json());
app.use(router);

/**
 * Rota de autenticação do github. O usuário da aplicação poderá se autenticar com a sua
 * conta do github para enviar as mensagens
 */
app.get("/github", (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get("/signin/callback", (request, response) => {
    const {code} = request.query

    return response.json(code);
})

export {serverHttp, io}


