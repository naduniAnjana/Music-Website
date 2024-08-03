
let left_scroll = document.getElementById('left-scroll');
let right_scroll = document.getElementById('right-scroll');
let art = document.querySelector('.art'); 

left_scroll.addEventListener('click', () => {
    art.scrollLeft -= 330;
});

right_scroll.addEventListener('click', () => {
    art.scrollLeft += 330;
});
