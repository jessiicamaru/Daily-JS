const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let number;
let formattedNumber;

function Validate(options) {
    let form = $(options.form);
    let selectorRules = {};
    let submitButton = $(options.submitInfo);

    let form1 = form.querySelector(options.form1);
    let form2 = form.querySelector(options.form2);

    console.log(form);
    let isFormValid = true;

    function validator(inputElement, rule) {
        let errorElement = parentElement(inputElement);
        let errorMessage;

        let rules = selectorRules[rule.selector];

        for (let i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) {
                break;
            }
        }

        if (errorMessage) {
            errorElement.classList.remove('valid');
            errorElement.classList.add('invalid');
            if (errorElement.querySelector('.message')) {
                errorElement.querySelector('.message').innerText = errorMessage;
            }
        } else {
            errorElement.classList.remove('invalid');
            errorElement.classList.add('valid');
            if (errorElement.querySelector('.message')) {
                errorElement.querySelector('.message').innerText = ' ';
            }
        }

        return !!errorMessage;
    }

    function parentElement(element) {
        while (element.parentElement) {
            if (element.parentElement.matches(options.errorElement)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    options.rules.forEach((rule, index) => {
        const inputElement = form.querySelector(rule.selector);

        if (Array.isArray(selectorRules[rule.selector])) {
            selectorRules[rule.selector].push(rule.test);
        } else {
            selectorRules[rule.selector] = [rule.test];
        }

        inputElement.onblur = () => {
            validator(inputElement, rule);
        };

        inputElement.oninput = () => {
            let errorElement = parentElement(inputElement);
            if (inputElement.id !== 'password') {
                errorElement.classList.remove('invalid');
                errorElement.classList.add('valid');
                errorElement.querySelector('.message').innerText = '';
            } else {
                if (inputElement.value) {
                    if (inputElement.value.length >= 6) {
                        errorElement.querySelector('#condition--1').style.color = 'green';
                    } else {
                        errorElement.querySelector('#condition--1').style.color = 'red';
                    }

                    if (/\d/.test(inputElement.value)) {
                        errorElement.querySelector('#condition--2').style.color = 'green';
                    } else {
                        errorElement.querySelector('#condition--2').style.color = 'red';
                    }

                    if (/[A-Z]/.test(inputElement.value)) {
                        errorElement.querySelector('#condition--3').style.color = 'green';
                    } else {
                        errorElement.querySelector('#condition--3').style.color = 'red';
                    }
                }
            }
        };
    });

    submitButton.onclick = () => {
        options.rules.forEach((rule, index) => {
            const inputElement = form.querySelector(rule.selector);
            var isValid = validator(inputElement, rule);

            if (isValid) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            console.log(form1);
            console.log(form2);

            form1.style.transform = 'translateX(calc(-100% - 16px))';
            form2.style.transform = 'translateX(0)';

            number = Math.floor(Math.random() * 100000);
            formattedNumber = String(number).padStart(5, '0');

            function sendMail() {
                (function () {
                    emailjs.init('2ocCChW_zvIqTSguc');
                })();

                var params = {
                    sendername: 'jessiicamaru (Dũng Hoàng)',
                    to: form.querySelector('#email').value,
                    fromname: 'Thank you for signing up',
                    toname: form.querySelector('#firstName').value + ' ' + form.querySelector('#lastName').value,
                    message: formattedNumber,
                    replyto: 'Dandrew2407@gmail.com',
                };

                var serviceID = 'service_sszkq9s';
                var templateID = 'template_1t20roc';

                emailjs
                    .send(serviceID, templateID, params)
                    .then((res) => {
                        console.log('Success');
                    })
                    .catch();
            }

            sendMail();
        }
    };

    console.log(selectorRules);
}

Validate.isRequired = function (selector) {
    return {
        selector,
        test(value) {
            return value.trim() !== '' ? undefined : 'Vui lòng nhập trường này';
        },
    };
};

Validate.isEmail = function (selector) {
    return {
        selector,
        test(value) {
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            return regex.test(value) ? undefined : 'Vui lòng nhập email hợp lệ';
        },
    };
};

Validate.isPassword = function (selector) {
    return {
        selector,
        test(value) {
            if (value.length >= 6 && /\d/.test(value) && /[A-Z]/.test(value)) {
                return undefined;
            } else {
                return 'Error';
            }
        },
    };
};

Validate.isConfirmation = function (selector, password) {
    return {
        selector,
        test(value) {
            return value === password() ? undefined : 'Mật khẩu không khớp';
        },
    };
};

Validate.isPhoneNumber = function (selector) {
    return {
        selector,
        test(value) {
            if (/[A-Z]/.test(value) || /[a-z]/.test(value)) {
                return 'Nhập số điện thoại hợp lệ';
            } else {
                return undefined;
            }
        },
    };
};
