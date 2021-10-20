//Configuração do bancode dados
import {PrismaClient} from "@prisma/client";

const prismaClient = new PrismaClient();

export default prismaClient;