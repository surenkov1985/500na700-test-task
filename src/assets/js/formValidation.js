const input = document.querySelectorAll(".input");
const emailInput = document.querySelector(".email");
const phoneInput = document.querySelector(".phone");

const inputEvents = ["input", "keydown", "blur"];

inputEvents.forEach((event) => {
	emailInput.addEventListener(event, function (e) {
		let key = e.key;
		let str = e.target.value;
		let regexp =
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let testString = "Введите валидный email";

		emailInput.value = str;

		testValue(emailInput, regexp, testString);

		if (key === "Enter" || e.type === "blur") {
			e.preventDefault();
			emailInput.dataset.reg = "true";

			testValue(emailInput, regexp, testString);

			if (emailInput.dataset.test === "true") {
				for (let i = 0; i < input.length; i++) {
					if (input[i].classList.contains("email")) {
						input[i + 1].focus();
					}
				}
			}
		}
	});

	phoneInput.addEventListener(event, function (e) {
		let key = e.key;
		let testReg = /[(\+\d\s\(\d\d\d\)\s\d\d\d-\d\d-\d\d)(\d\s\(\d\d\d\)\s\d\d\d-\d\d-\d\d)]/gi;
		let valRegRu = /\D/gi;
		let valRegEur = /\+\d{15}/;
		let testString = "Введите валидный номер";

		const errElem = document.querySelector(".err-phone");

		let cursorPosition = e.target.selectionStart;
		let str = formatValueInput(phoneInput, valRegRu);
		let formatStr = "";

		let rusTel = ["7", "8", "9"];

		if (cursorPosition !== phoneInput.value.length) {
			if (e.data && valRegRu.test(e.data)) {
				phoneInput.value = str;
			}

			return;
		}

		if (rusTel.indexOf(str[0]) > -1) {
			if (str[0] === "7") formatStr = "+" + str[0];

			if (str[0] === "8") formatStr = str[0];

			if (str[0] === "9") formatStr = "+7" + str[0];

			if (str.length > 1) {
				formatStr += " (" + str.slice(1, 4);
			}

			if (str.length >= 5) {
				formatStr += ") " + str.slice(4, 7);
			}

			if (str.length >= 8) {
				formatStr += "-" + str.slice(7, 9);
			}

			if (str.length >= 10) {
				formatStr += "-" + str.slice(9, 11);
			}

			testValue(phoneInput, testReg, testString);
		} else {
			if (str.length >= 1) formatStr = "+" + str;

			testValue(phoneInput, valRegEur, testString);
		}

		phoneInput.value = formatStr;

		if (key === "Enter" || e.type === "blur") {
			e.preventDefault();

			phoneInput.dataset.reg = "true";

			if (str[0] === 0 || str[0] < 7) testValue(phoneInput, valRegEur, testString);

			if (str[0] <= 9 && str[0] >= 7) testValue(phoneInput, testReg, testString);

			if (str.length < 10) {
				errElem.innerHTML = testString;
				phoneInput.classList.add("error");
				phoneInput.dataset.test = "false";
			}

			if (phoneInput.dataset.test === "true") {
				for (let i = 0; i < input.length; i++) {
					if (input[i].classList.contains("phone")) {
						input[i + 1].focus();
					}
				}
			}
		}
	});
});

function testValue(elem, reg, string) {
	if (elem.dataset.reg === "true") {
		let str = elem.value;
		const errElem = document.querySelector(`.err-${elem.id}`);

		if (!str.length) {
			errElem.innerHTML = "Заполните это поле";
			elem.classList.add("error");
			elem.dataset.test = "false";
		} else if (!reg.test(str)) {
			errElem.innerHTML = string;
			elem.classList.add("error");
			elem.dataset.test = "false";
		} else {
			elem.classList.remove("error");
			elem.dataset.test = "true";
			errElem.innerHTML = "";
		}
	}
}

function formatValueInput(elem, regexp) {
	let str = elem.value.replace(regexp, "");

	return str;
}
