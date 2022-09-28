import wweb from "whatsapp-web.js";
import parser from "yargs-parser";

const { List } = wweb;

function getList(items) {
	return new Promise((resolve) => {
		var rows = [];

		const argv = parser(items);

		items.includes(" ") ? items.split(" ") : [items];

		var msgTitle = argv.title ?? "Choose";
		var msgDescription = argv.cap ?? "Select one option from the list";
		var buttonText = argv.btn ?? "Click here!";
		var PopTitle = argv.pop ?? "Available Options:";

		if (argv._) {
			argv._.forEach((elem) => {
				rows.push({
					id: elem.replace(/_/g, " "),
					title: elem.replace(/_/g, " "),
				});
			});
		}

		try {
			const xList = new List(
				msgDescription,
				buttonText,
				[
					{
						title: PopTitle,
						rows,
					},
				],
				msgTitle
			);

			resolve(xList);
		} catch (error) {
			return false;
		}
	});
}

export default getList;
