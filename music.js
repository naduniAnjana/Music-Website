
const song = [
  {
      id: 1,
      songName: `Aasa Kooda <br>
                  <div class="subtitle">Sai Abhyankkar</div>`,
      poster: "images/music1.jpg",
  },

  {
      id: 2,
      songName: `Akhiyaan Gulaab <br>
                  <div class="subtitle">Mitraz</div>`,
      poster: "images/music2.jpg",
  },

  {
      id: 3,
      songName: `Water <br>
                  <div class="subtitle">Tyla</div>`,
      poster: "images/music3.jpg",
  },

  {
      id: 4,
      songName: `Soni Soni <br>
                  <div class="subtitle">Darshan Raval, Jonita Gandhi</div>`,
      poster: "images/music4.jpg",
  },

  {
      id: 5,
      songName: `Flowers <br>
                  <div class="subtitle">Miley Cyrus</div>`,
      poster: "images/music5.jpg",
  },

  {
      id: 6,
      songName: `Nadaaniyan <br>
                  <div class="subtitle">Akshath</div>`,
      poster: `images/music6.jpg`,
  }
];

const body = document.querySelector("body"),
  sidebar = body.querySelector(".sidebar"),
  toggle = body.querySelector(".toggle");
// searchBtn = body.querySelector(".search-box");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

// searchBtn.addEventListener("click", () => {
//   sidebar.classList.remove("close");
// });

document.querySelector('.notification-bell').addEventListener('click', function () {
  this.classList.add('ring');

  setTimeout(() => {
    this.classList.remove('ring');
  }, 600);
});
    



// search data start 
let search_results = document.getElementsByClassName('search_results')[0];

song.forEach(element => {
  const {id, songName, poster} = element;
  // console.log(songName);
  let card = document.createElement('a');
  card.classList.add('card');

  card.innerHTML = `<img src="${poster}" alt="">
                            <div class="content">
                                ${songName}
                            </div>`;
  search_results.appendChild(card);

});

let input = document.getElementsByTagName('input')[0];

input.addEventListener('keyup', () => {
  let input_value = input.value.toUpperCase();
  let items = search_results.getElementsByTagName('a');

  for (let index = 0; index < items.length; index++) {
    let as = items[index].getElementsByClassName('content')[0];
    let text_value = as.textContent || as.innerHTML;

    if (text_value.toUpperCase().indexOf(input_value) > -1) {
      items[index].style.display = "flex";
    } else {
      items[index].style.display = "none";
    }

    if (input.value == 0) {
      search_results.style.display = "none";
    } else {
      search_results.style.display = "";
    }
  }
});