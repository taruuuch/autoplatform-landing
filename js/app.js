const phoneInput = document.querySelector('input[name="phone"]');
const phoneModal = document.querySelector('input#modal-phone');

new IMask(phoneInput, {
	mask: '+{38} (000) 000-00-00'
});
new IMask(phoneModal, {
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
	touch: true
});

const body = document.getElementsByTagName('body')[0];

const requestActive = () => {
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

		body.style.overflow = 'hidden';
	};

	requestModal.onclick = function (event) {
		if (event.target.closest('#request-modal__container')) return;

		requestModal.classList.remove('open');

		body.style.overflow = 'auto';
		body.style.marginRight = '0';
	};

	requestButtons.forEach(button => {
		button.onclick = function (event) {
			event.preventDefault();

			const type = this.getAttribute('data-type');

			openModal(type);
		};
	});
};

const navigationActive = () => {
	const headerHeight = document.getElementById('header').offsetHeight;
	const navigationButton = document.getElementById('header__collapse');
	const navigation = document.getElementById('navigation');
	const navigationLinks = document.querySelectorAll('.header__navigation-link');

	navigationButton.onclick = function (event) {
		this.classList.toggle('active');
		navigation.classList.toggle('active');
		navigation.style.top = `${headerHeight}px`;
		navigation.style.height = `calc(100vh - ${headerHeight}px)`;

		if (body.style.overflowY == '' || body.style.overflowY != 'hidden') {
			body.style.overflowY = 'hidden';
		} else {
			body.style.overflowY = '';
		}

		navigationLinks.forEach((link, index) => {
			if (link.style.animation) {
				link.style.animation = '';
			} else {
				link.style.animation = `navFade .5s ease forwards ${index / 7 + .3}s`;
			}
		});
	};
};

const formSend = () => {
	const infoForm = document.getElementById('infoForm');
	const requestModal = document.getElementById('request-modal');

	let forms = [];
	forms.push(infoForm);
	forms.push(requestModal);

	forms.forEach(form => {
		form.onsubmit = function (event) {
			event.preventDefault();
			event.stopImmediatePropagation();

			const formData = new FormData();

			formData.append('name', event.target.name.value);
			formData.append('phone', event.target.phone.value);

			if (event.target.description) {
				formData.append('description', event.target.description.value);
			}

			const btnSubmit = event.target.querySelector('button[type="submit"]')

			btnSubmit.setAttribute('disabled', 'disabled');
			sendMail(formData, btnSubmit);

			form.reset();
		};
	});

	const sendMail = (formData, btn) => fetch('/mail/send.php', {
			method: 'POST',
			body: formData
		})
		.then(response => response.text())
		.then(item => {
			btn.removeAttribute('disabled');
			btn.innerHTML = 'Заявка отправлена!';
			setTimeout(() => {
				btn.innerHTML = 'Заказать';
			}, 3000);
		});
};

const smoothScroll = () => {
	const navigationLinks = document.querySelectorAll('.header__navigation-link');

	navigationLinks.forEach(link => {
		link.onclick = function (event) {
			event.preventDefault();

			const id = this.getAttribute('href');
			const scroolBlock = document.querySelector(id);

			scroolBlock.scrollIntoView({
				behavior: 'smooth',
				block: 'center'
			});
		};
	});
};

requestActive();
navigationActive();
formSend();
smoothScroll();
