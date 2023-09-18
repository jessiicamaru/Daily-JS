const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const gridField = $('.grid');
const gridWidth = $('#gridWidth');
const gridHeight = $('#gridHeight');
const widthValue = $('.width-value');
const heightValue = $('.height-value');
const creatGrid = $('#creat');
const eraseGrid = $('#erase');
const paintGrid = $('#paint');
const clearGrid = $('#clear');
const colorInput = $('#color-input');

const rect = gridField.getBoundingClientRect();
// const AllItem = $$('.row');

let isPainting = false;
let isErasing = false;
let continueErase = false;
let gridWidthValue;
let gridHeightValue;
let startX;
let startY;

clearGrid.onclick = () => {
    gridField.innerHTML = '';
};

gridWidth.oninput = () => {
    widthValue.innerText = gridWidth.value;
};

gridWidth.oninput = () => {
    widthValue.innerText = gridWidth.value;
};

eraseGrid.onclick = () => {
    continueErase = !continueErase;
};

paintGrid.onclick = () => {
    isErasing = false;
};

creatGrid.onclick = () => {
    let width = gridWidth.value;
    let height = gridHeight.value;
    let html = '';
    let rowHtml = '<div class="row">';

    for (let i = 0; i < width; i++) {
        rowHtml += '<div class="item"></div>';
    }
    rowHtml += '</div>';

    for (let i = 0; i < height; i++) {
        html += rowHtml;
    }

    gridField.innerHTML = html;
    gridWidthValue = gridWidth.clientWidth;
    gridHeightValue = gridHeight.clientHeight;
};

gridField.addEventListener('mousedown', (e) => {
    if (continueErase) {
        isErasing = true;
        e.target.style.backgroundColor = 'white';
    }
    if (!isErasing) {
        isPainting = true;
    }
    if (isPainting) {
        e.target.style.backgroundColor = colorInput.value;
    }
});

gridField.addEventListener('mousemove', (e) => {
    const AllRow = $$('.row');

    startX = e.clientX - gridField.getBoundingClientRect().left;
    startY = e.clientY - gridField.getBoundingClientRect().top;

    startX = Number.parseInt(startX / 10);
    startY = Number.parseInt(startY / 10);
    const row = AllRow[startY];
    const item = row.querySelectorAll('.item')[startX];
    if (isPainting) {
        item.style.backgroundColor = colorInput.value;
    }
    if (isErasing) {
        item.style.backgroundColor = 'white';
    }
});

gridField.addEventListener('mouseup', (e) => {
    isPainting = false;
    if (isErasing) {
        isErasing = false;
        continueErase = true;
    }
});
