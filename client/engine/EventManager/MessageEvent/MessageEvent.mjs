import log from "../../module/log/index.mjs";
import readline from "../../module/readline/index.mjs";
import { EventAbstract } from "../EventAbstract.mjs";
import { Encryptor } from "../../Encryptor/Encryptor.mjs";

export class MessageEvent extends EventAbstract {
    name = "message";

    constructor(data) {
        super();
        this.data = data
    }

    actions () {
        const encryptID = new Encryptor(this.data.query[0]);
        let encrypt_address = encryptID.getEncryptID();

        const decryptKey = new Encryptor(this.data.query[1], appOptions.user_keys[encrypt_address]);

        log.info(`
        Текст сообщения => ${decryptKey.getDecrypt()}
        Идентификатор приложения отправителя => ${this.data.query[0].port}
        Идентификатор приложения получателя => ${appOptions.client.port}
        Время отправления => ${new Date(this.data.query[2]).yyyymmddhm()}`);
        readline.prompt();
    }
}