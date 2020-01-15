var phoneInput = document.querySelector('input[name="phone"]');
var maskOptions = {
  mask: '+{38} (000) 000-00-00'
};
var mask = IMask(phoneInput, maskOptions);
