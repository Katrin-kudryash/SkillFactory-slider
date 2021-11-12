let images = [{
	url: "https://img.favcars.com/mini/hatch/mini_hatch_2010_wallpapers_14_1280x960.jpg",
	title: "Mini Cooper черный"
}, {
	url: "https://img.favcars.com/mini/cabrio/mini_cabrio_2009_pictures_5_1280x960.jpg",
	title: "Mini Cooper красный"
}, {
	url: "https://www.t-r-n.ru/files/modification-images/cb/a8/5c/f9/40061_tmb940.jpg",
	title: "Mini Cooper синий"
}, {
	url: "https://i.pinimg.com/736x/c5/d9/14/c5d9142556fe74c49a2c1c2d4ea6d46a.jpg",
	title: "Mini Cooper бордовый"
}, {
	url: "https://auusaca.com/wp-content/uploads/2019/12/6.jpg",
	title: "Mini Cooper белый"
}];

function initSlider(options) {
	if (!images || !images.length) return;

	options = options || {
		titles: false,
		dots: true,
		autoplay: false
	};

	let sliderImages = document.querySelector(".slider__images");
	let sliderArrows = document.querySelector(".slider__arrows");
	let sliderDots = document.querySelector(".slider__dots");

	initImages();
	initArrows();

	if (options.dots) {
		initDots();
	}

	if (options.titles) {
		initTitles();
	}

	if (options.autoplay) {
		initAutoplay();
	}

	function initImages() {
		images.forEach((image, index) => {
			let imageDiv = `<div class="image n${index} ${index === 0 ? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
			sliderImages.innerHTML += imageDiv;
		});
	}

	function initArrows() {
		sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
			arrow.addEventListener("click", function () {
				let curNumber = +sliderImages.querySelector(".active").dataset.index;
				let nextNumber;
				if (arrow.classList.contains("left")) {
					nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
				} else {
					nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
				}
				moveSlider(nextNumber);
			});
		});
	}

	function initDots() {
		images.forEach((image, index) => {
			let dot = `<div class="slider__dots-item n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></div>`;
			sliderDots.innerHTML += dot;
		});
		sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
			dot.addEventListener("click", function () {
				moveSlider(this.dataset.index);
			})
		})
	}

	function moveSlider(num) {
		sliderImages.querySelector(".active").classList.remove("active");
		sliderImages.querySelector(".n" + num).classList.add("active");
		if (options.dots) {
			sliderDots.querySelector(".active").classList.remove("active");
			sliderDots.querySelector(".n" + num).classList.add("active");
		}
		if (options.titles) changeTitle(num);
	}

	function initTitles() {
		let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
		sliderImages.innerHTML += cropTitle(titleDiv, 55);
	}

	function changeTitle(num) {
		if (!images[num].title) return;
		let sliderTitle = sliderImages.querySelector(".slider__images-title");
		sliderTitle.innerText = cropTitle(images[num].title, 55);
	}

	function cropTitle(title, size) {
		if (title.length <= size) {
			return title;
		} else {
			return title.substr(0, size) + "...";
		}
	}

	function initAutoplay() {
		setInterval(() => {
			let curNumber = +sliderImages.querySelector(".active").dataset.index;
			let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
			moveSlider(nextNumber);
		}, options.autoplayInterval);
	}
}

let sliderOptions = {
	dots: true,
	titles: true,
	autoplay: true,
	autoplayInterval: 5000
};

document.addEventListener("DOMContentLoaded", function () {
	initSlider(sliderOptions);
});