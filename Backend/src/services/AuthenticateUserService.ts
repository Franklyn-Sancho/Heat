import axios from "axios";
import prismaClient from "../prisma"
import {sign} from "jsonwebtoken"

interface IAccessTokenResponse {
    access_token: string
}

interface IUserResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string
}

//Classe responsável pela autenticação do usuário 
//
class AuthenticateUserService {
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token"

        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID, //Código Env
                client_secret: process.env.GITHUB_CLIENT_SECRET, //Código Env
                code,
            },
            headers: {
                "accept": "application/json"
            }
        })

        //Consome os dados da Api do próprio Gighub, retornando o token e autorizando. 
        const response = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        })

        const { login, id, avatar_url, name } = response.data

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })
        /**Se o usuário não existir, neste caso, nunca ter se autenticado na nossa aplicação,
         * será criado no banco de dados . 
         */
        if(!user) {
            user = await prismaClient.user.create({
                data: { //Os dados guardados no banco de dados. 
                    github_id: id,
                    login,
                    avatar_url,
                    name
                }
            })
        }

        //Para logar na nossa aplicação será necessário esses dados 
        const token = sign({
            user: {
                name: user.name,
                avatar_url: user.avatar_url,
                id: user.id,
            }, 
        },
        process.env.JWT_SECRET, //O id de autenticação único de cada usuário
        {
            subject: user.id, 
            expiresIn: "1d", //O token expira em um dia
        }
        
        )

        return {token, user};
    }
}

export { AuthenticateUserService }