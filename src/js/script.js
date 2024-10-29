const titleInput = document.getElementById('title');
const titleResult = document.getElementById('titleResult');
const xAxisSlider = document.getElementById('xAxis');
const yAxisSlider = document.getElementById('yAxis');
const blackRadio = document.getElementById('black');
const whiteRadio = document.getElementById('white');
const tShirtImage = document.getElementById('imgCamisa');
const bigImage = document.getElementById('imgBig');
const littleImage = document.getElementById('imgLittle');
const imageName = document.getElementById('imgName');
const draggableImages = document.querySelectorAll('#images img');

// Title input handling
titleInput.addEventListener('input', (event) => {
    titleResult.textContent = event.target.value;
});

// Axis movement handling
xAxisSlider.addEventListener('input', (event) => {
    const value = event.target.value;
    titleResult.style.left = `${25 + (value * 1)}%`;
});

yAxisSlider.addEventListener('input', (event) => {
    const value = event.target.value;
    titleResult.style.top = `${25 + (value * 1)}%`;
});

// T-shirt color handling
function updateTShirtColor(isBlack) {
    if (isBlack) {
        tShirtImage.src = './src/image/camiseta_negra.png';
        titleResult.style.color = 'white';
        imageName.style.color = 'white';
    } else {
        tShirtImage.src = './src/image/camiseta_blanca.png';
        titleResult.style.color = 'black';
        imageName.style.color = 'black';
    }
}

blackRadio.addEventListener('change', () => updateTShirtColor(true));
whiteRadio.addEventListener('change', () => updateTShirtColor(false));


// Image drag
function handleDragStart() {
    currentImg = this.src;
}

function handleDragEnd() {
    currentImg = '';
}

draggableImages.forEach(img => {
    img.addEventListener('dragstart', handleDragStart);
    img.addEventListener('dragend', handleDragEnd);
});

const tShirt = document.getElementById('tShirt');
tShirt.addEventListener('dragover', (event) => {
    event.preventDefault();  
});

tShirt.addEventListener('drop', (event) => {
    event.preventDefault();  
    if (currentImg) {
        updateImages(currentImg);
    }
});



// Image mobile click
function mobileClick() {
    if (window.innerWidth <= 789) { 
        draggableImages.forEach(img => {
            img.addEventListener('click', () => {
                updateImages(img.src);
            });
        });
    }
}

// Update both images and name
function updateImages(imgSrc) {
    bigImage.src = imgSrc;
    littleImage.src = imgSrc;

    bigImage.classList.remove('hidden');
    littleImage.classList.remove('hidden');
    
    // Extract image name from src and set it in uppercase
    const fileName = imgSrc.split('/').pop();
    const nameWithoutExtension = fileName.split('.')[0];
    imageName.textContent = nameWithoutExtension.toUpperCase();
}


mobileClick();