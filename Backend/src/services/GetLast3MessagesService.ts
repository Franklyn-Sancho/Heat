import prismaClient from "../prisma"


/**
 * Classe respónsável por retornar as últimas três mensagens postadas pelos usuários
 * a data será decrescente e vai incluir quais usuários mandaram.
 */
class GetLast3MessagesService {
    async execute() {
        const messages = await prismaClient.message.findMany({
            take: 3, //retorna 3
            orderBy: {
                created_at: "Desc" //decrescente
            },
            include: {
                user: true //inlui os usuário
            }
        })

        return messages; //retorna as mensagens
    }
}

export {GetLast3MessagesService}