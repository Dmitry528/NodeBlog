let btnUpload = document.querySelector('.btnUpload');

btnUpload.addEventListener('click', () => {
    let imgText = document.querySelector('.selectedImg');
    imgText.innerHTML = 'Img is select';
});