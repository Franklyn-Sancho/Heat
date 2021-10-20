import prismaClient from "../prisma"


/**
 * Classe responsável por retornar o perfil dos usuário, verificando o Id no BD
 *
 */
class ProfileUserService {
    async execute(user_id: string) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        })
        return user; //retorna o usuário pelo ID
    }
}

export {ProfileUserService}