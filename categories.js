
document.querySelectorAll('.categories .item').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.add('bounce');

        item.addEventListener('animationend', () => {
            item.classList.remove('bounce');
        }, { once: true });
    });
});