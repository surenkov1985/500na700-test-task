// Styles import

import "./assets/styles/main.scss";

// Slider

import Swiper from "swiper/bundle";

document.addEventListener("DOMContentLoaded", function () {
	const NavButton = document.querySelector(".navbar__toggler-btn");
	const NavbarItem = document.querySelectorAll(".navbar__item");

	NavButton.addEventListener("click", function (e) {
		NavButton.classList.toggle("active");
	});

	NavbarItem.forEach((item) => {
		["mouseover", "mouseout"].forEach((listener) => {
			item.addEventListener(listener, function (e) {
				const submenuId = item.dataset.toggle;
				const Submenu = document.getElementById(submenuId);

				if (e.type === "mouseover") {
					Submenu.classList.add("show");
				} else {
					Submenu.classList.remove("show");
				}
			});
		});
	});

	const headSlider = new Swiper(".mySlider", {
		spaceBetween: 20,
		loop: true,
		centeredSlides: true,
		slidesPerView: "auto",
		// slidesPerView: 1.3,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
	});
});
