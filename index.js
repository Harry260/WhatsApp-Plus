import wweb from "whatsapp-web.js";
import { craftList, craftButton } from "./lib/commands.js";
import QRcode from "qrcode-terminal";
import "dotenv/config";
const PREFIX = process.env.PREFIX || "!";

const { Client, LocalAuth } = wweb;

const client = new Client({
	authStrategy: new LocalAuth(),
	puppeteer: {
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
	},
});

client.on("qr", (qr) => {
	QRcode.generate(qr, { small: true });
});

client.on("ready", () => {
	console.log("Whatsapp Pro Enabling!");
});

client.on("message_create", (msg) => handleMsg(msg));

async function handleMsg(msg) {
	const chat = await msg.getChat();

	var mBody = msg.body;

	if (mBody !== "" && msg.id.fromMe === true) {
		var mBodySplit = mBody.split(" ");

		var mCommand = mBodySplit[0];
		var mArg = mBody.includes(" ") ? mBodySplit.slice(1).join(" ") : false;

		if (mCommand === PREFIX + "list") {
			var obj = await craftList(mArg);
			if (obj) {
				client.sendMessage(chat.id._serialized, obj);
				msg.delete(true);
				msg.delete();
			}
		} else if (mCommand === PREFIX + "btn") {
			var obj = await craftButton(mArg);
			if (obj) {
				client.sendMessage(chat.id._serialized, obj);
				msg.delete(true);
				msg.delete();
			}
		}
	}
}

client.initialize();
