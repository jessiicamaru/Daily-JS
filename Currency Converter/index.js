//Country_List
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let amount = $('.amount input');
let selectCountry = $$('.select-input select');
let toSelected = $('.to select');
let fromSelected = $('.from select');
let resultText = $('.result');
let getBtn = $('.convert-box button');
let reverseButton = $('.reverse');

Array.from(selectCountry).forEach((select, index) => {
    let html = Object.keys(Country_List).map((country) => {
        const selected = (index === 0 && country === 'USD') || (index === 1 && country === 'GBP') ? 'selected' : '';
        return `<option value="${country}" ${selected}>${country}</option>`;
    });
    select.innerHTML = html.join('');

    select.addEventListener('change', () => {
        const url = `https://flagcdn.com/48x36/${Country_List[select.value].toLowerCase()}.png`;
        const img = index == 0 ? $('.from img') : $('.to img');
        img.src = url;
    });
});

async function getExchange() {
    const amountVal = Number(amount.value) || 1;

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/57fbf3048c3637c34e3300d0/latest/${fromSelected.value}`);
        const result = await response.json();
        const exchangeRate = result.conversion_rates[toSelected.value];
        const convertedVal = (amountVal * exchangeRate).toFixed(2);
        resultText.innerText = `${amountVal} ${fromSelected.value} = ${convertedVal} ${toSelected.value}`;
    } catch (error) {
        resultText.innerText = 'Something went wrong...';
    }
}

window.addEventListener('load', getExchange());
getBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getExchange();
});

reverseButton.onclick = () => {
    let temp = selectCountry[0].value;
    selectCountry[0].value = selectCountry[1].value;
    selectCountry[1].value = temp;

    let img = $('.from img');
    img.src = `https://flagcdn.com/48x36/${Country_List[selectCountry[0].value].toLowerCase()}.png`;

    img = $('.to img');
    img.src = `https://flagcdn.com/48x36/${Country_List[selectCountry[1].value].toLowerCase()}.png`;
    getExchange();
};
