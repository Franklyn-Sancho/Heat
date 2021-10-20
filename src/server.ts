import { serverHttp } from "./app";
//O serverHttp será responsável por subir o nosso server na porta 4000
serverHttp.listen(4000, () => console.log(`server is running on PORT 4000`));