function limitDigit(input) {
    let inputValue = input.value;
    inputValue = inputValue.replace(/\D/g, '');

    if (inputValue.length > 1) {
        inputValue = inputValue.substring(0, 1);
    }

    input.value = inputValue;
}

let verifyButton = $('.verify');
let codeInput = $('#code--input');
let rightContainer = $('.right--container');
let leftContainer = $('.left--container');
let code = '';

verifyButton.onclick = () => {
    Array.from(codeInput.querySelectorAll('input')).forEach((input) => {
        code += input.value;
    });

    if (code === formattedNumber) {
        rightContainer.style.width = '0';
        rightContainer.innerHTML = '';
        rightContainer.style.display = 'none';
        leftContainer.style.width = '100%';

        setTimeout(function () {
            leftContainer.innerHTML = `
            <div>
                <a href="https://www.instagram.com/_dung.24_/"></a>
                <img src="./img/IMG_2939.jpg" alt="">    
            </div>
            `;
        }, 1500);
    }
};
