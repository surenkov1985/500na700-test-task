// Styles import

import "./assets/styles/main.scss";

// Slider

import Swiper from "swiper/bundle";

// JS import

import "./assets/js/formValidation";

document.addEventListener("DOMContentLoaded", function () {
	const Navbar = document.querySelector(".navbar");
	const FalseNavbar = document.querySelector(".false-navbar");
	const FalseBG = document.querySelector(".false__navbar-bg");
	const FalseNavItem = FalseNavbar.querySelectorAll(".navbar__item");
	const CloseButton = FalseNavbar.querySelector(".navbar__toggler-btn");
	const NavButton = Navbar.querySelector(".navbar__toggler-btn");
	const NavbarItem = Navbar.querySelectorAll(".navbar__item");
	const NavbarBg = document.querySelector(".navbar__bg");
	const SubItem = FalseNavbar.querySelectorAll(".navbar__submenu");

	const Questions = document.querySelectorAll(".questions__item-title");
	const QuestionsSubLists = document.querySelectorAll(".questions__sublist");

	const newsSwiperOptions = {
		slidesPerView: "auto",
		freeMode: true,
	};

	const newsSlider = new Swiper(".news__slider", newsSwiperOptions);
	const mediaQuery = window.matchMedia("(max-width: 550px)");
	let mobileWidth = false;

	NavButton.addEventListener("click", function (e) {
		FalseBG.classList.add("show");
		FalseNavbar.classList.add("active");

		SubItem.forEach((item) => {
			item.classList.remove("show");
		});
	});

	FalseBG.addEventListener("click", function (e) {
		if (e.target.classList.contains("false__navbar-bg")) {
			FalseBG.classList.remove("show");
			FalseNavbar.classList.remove("active");
		}
	});

	CloseButton.addEventListener("click", function (e) {
		FalseBG.classList.remove("show");
		FalseNavbar.classList.remove("active");
	});

	mediaChange(mediaQuery);

	mediaQuery.addListener(mediaChange);

	NavbarItem.forEach((item) => {
		const Link = item.querySelector(".navbar__link");
		const submenuId = item.dataset.toggle;
		const Submenu = document.getElementById(submenuId);
		Submenu.classList.remove("show");

		["mouseover", "mouseout"].forEach((listener) => {
			item.addEventListener(listener, function (e) {
				if (e.type === "mouseover") {
					Submenu.classList.add("show");
					NavbarBg.classList.add("show");
				} else {
					Submenu.classList.remove("show");
					NavbarBg.classList.remove("show");
				}
			});
		});
	});

	FalseNavItem.forEach((item) => {
		const Link = item.querySelector(".navbar__link");
		const submenuId = item.dataset.toggle;
		const Submenu = document.getElementById(submenuId);

		["touch", "click"].forEach((listener) => {
			Link.addEventListener(listener, function (e) {
				e.preventDefault();
				SubItem.forEach((item) => {
					item.classList.remove("show");
				});
				const submenuId = item.dataset.toggle;
				const Submenu = document.getElementById(submenuId);
				Submenu.classList.add("show");
			});
		});
	});

	Questions.forEach((item) => {
		const submenuId = item.dataset.toggle;
		const Submenu = document.getElementById(submenuId);

		["touch", "click"].forEach((listener) => {
			item.addEventListener(listener, function (e) {
				e.preventDefault();
				QuestionsSubLists.forEach((list) => {
					list.classList.remove("show");
				});
				const submenuId = item.dataset.toggle;
				const Submenu = document.getElementById(submenuId);
				Submenu.classList.add("show");
			});
		});
	});

	const headSlider = new Swiper(".mySlider", {
		spaceBetween: 20,
		loop: true,
		centeredSlides: true,
		slidesPerView: "auto",
		initialSlide: 1,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		navigation: {
			prevEl: ".slider__button-prev",
			nextEl: ".slider__button-next",
		},
	});

	function mediaChange(e) {
		if (e.matches) {
			newsSlider.enable();
			mobileWidth = true;
		} else {
			newsSlider.disable();
			mobileWidth = false;
		}
	}
});
