var btn_items = ["Hello", "Howdy", false];
$(document.body).on("click", ".msg-btn", (e) => {
	var d = e.currentTarget;
	d.parentNode.appendChild(d);

	var id = $(e.currentTarget).data("id");
	btn_items[id] = false;
	$(e.currentTarget).addClass("add-btn").removeClass("msg-btn");
});

$(document.body).on("click", ".add-btn", (e) => {
	var id = $(e.currentTarget).data("id");

	var cap = askP("Button Text ");
	if (cap) {
		btn_items[id] = cap.replace(/ /g, "_");
		$(e.currentTarget)
			.removeClass("add-btn")
			.addClass("msg-btn")
			.find(".btn-text")
			.text(cap);
	}
});

$(".toggle").click(() => {
	$("body").toggleClass("list-mode").toggleClass("btn-mode");
});

$(document.body).on("click", ".list-item", (e) => {
	$(e.currentTarget).remove();
});

$(".send-btn").on("click", () => {
	var btn = askP("Button Text ");
	if (btn) {
		$(".items-wrap").append(`<div class="list-item">${btn}</div>`);
	}
});

$(".list-close").on("click", () => {
	$(".add-list-item").fadeOut();
});

$(".list-open").on("click", () => {
	$(".add-list-item").fadeIn().css("display", "flex");
});

function createMSG() {
	var isBtnMode = $("body").hasClass("btn-mode");
	var msgTitle = $(".msg-title").text().trim() || "Message Title";
	var msgCap =
		$(".msg-cap").text().trim() ||
		"Probably this is the caption of the message!";
	var btn = $(".btn-msg").text().trim() || "Click Here";
	var pop = "Available Options";

	if (isBtnMode) {
		pop = $(".msg-sub").text().trim() || "Available Options";
	} else {
		pop = $(".msg-l-sub").text().trim() || "Available Options";
	}

	var result = "Error!";
	var basic = `--title="${msgTitle}" --cap="${msgCap}" --pop="${pop}"`;
	if (isBtnMode) {
		result = "!btn " + basic;

		console.log(btn_items);
		if (
			btn_items[0] === false &&
			btn_items[1] === false &&
			btn_items[2] === false
		) {
			alert("Please add minimum one button!");
			return;
		}
		btn_items.forEach((e) => {
			if (e) {
				result += " " + e.replace(/ /, "_");
			}
		});
	} else {
		result = "!list " + basic + ` --btn="${btn}"`;
		var list_items_root = $(".items-wrap").children(".list-item");
		if (list_items_root.length === 0) {
			alert("Pleas add minimum one item in the list!");
			return;
		}

		list_items_root.each(function () {
			var text = $(this).text().trim();
			if (!text) {
				return;
			}
			result = result + " " + text;
		});
	}

	console.log(result);
	copyToClipboard(result);
	alert("Copied to Clipboard");
}

function copyToClipboard(text) {
	if (window.clipboardData && window.clipboardData.setData) {
		// Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
		return window.clipboardData.setData("Text", text);
	} else if (
		document.queryCommandSupported &&
		document.queryCommandSupported("copy")
	) {
		var textarea = document.createElement("textarea");
		textarea.textContent = text;
		textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
		document.body.appendChild(textarea);
		textarea.select();
		try {
			return document.execCommand("copy"); // Security exception may be thrown by some browsers.
		} catch (ex) {
			console.warn("Copy to clipboard failed.", ex);
			return prompt("Copy to clipboard: Ctrl+C, Enter", text);
		} finally {
			document.body.removeChild(textarea);
		}
	}
}

function askP(what) {
	let p = prompt(what);

	if (p != null) {
		return p;
	} else {
		return false;
	}
}
