import prismaClient from "../prisma"
import {io} from "../app"

/**
 * A classe que  cria o serviço de mensagem, a regra do negócio
 */
class CreateMessageService {
    async execute(text: string, user_id: string) {
        const message = await prismaClient.message.create({
            data: {
                text, //Cria uma mensagem
                user_id, //E o Id do usuário, baseado na construção do nosso BD
            },
            include: {
                user: true,
            }
        })

        const infoWS = { //as informações que constarão nas nossas mensagens
            text: message.text, //A mensagem
            user_id: message.user_id, //O Id do usuário
            create_at: message.create_at, //O momento dacriação
            user: {
                name: message.user.name, //O nome do usuário da migrate user
                avatar_url: message.user.avatar_url //O avatar do usuário
            }
        }

        io.emit("new message", infoWS); //Quem o Io vai ouvir

        return message;
    }
}

export {CreateMessageService}