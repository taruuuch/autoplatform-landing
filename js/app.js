const phoneInput = document.querySelector('input[name="phone"]');
const mask = IMask(phoneInput, {
  mask: '+{38} (000) 000-00-00'
});

const reviewSlider = tns({
	container: '.review__list',
	items: 1,
	controls: false,
	autoHeight: true,
	nav: true,
	navPosition: 'bottom',
	mouseDrag: true,
	speed: 400,
	responsive: {
		640: {},
		700: {},
		900: {}
	}
});

const requestModal = document.getElementById('request-modal');
const requestLightButtons = Array.from(document.getElementsByClassName('btn-light'));
let requestButtons = Array.from(document.getElementsByClassName('btn-secondary'));

requestLightButtons.forEach(button => {
	requestButtons.push(button);
});

const openModal = (type) => {
	let message;

	if (type != null) {
		message = `Заказ автовышки на ${type}м`;
	} else {
		message = `Заказ автовышки`;
	}

	const modalDescription = document.getElementById('modal-description');

	modalDescription.value = message;
	requestModal.classList.add('open');
};

requestModal.onclick = function(event) {
	if (event.target.closest('#request-modal__container')) return;

	requestModal.classList.remove('open');
};

requestButtons.forEach(button => {
	button.onclick = function(event) {
		event.preventDefault();

		const type = this.getAttribute('data-type');

		openModal(type);
	};
});
