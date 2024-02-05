const logOut = document.getElementById("logout");
const backtolog = (ev) => {
    ev.preventDefault();
    window.location.href = "../../assets/pages/Login.html";
};

logOut.addEventListener("click", backtolog);

const dataList = document.getElementById("content");
const card = document.querySelector(".card");
const listContent = document.querySelector(".navbar_list");
const search = document.getElementById("searchcol");
const sidebar = document.querySelector(".sidebar");
const BASE_URL = "https://openlibrary.org/people/mekBot/books/";
const BASE_URL_IMG = "https://covers.openlibrary.org/b/olid";

const fetchData = async () => {
    try {
        const res = await fetch(`${BASE_URL}currently-reading.json`);
        if (!res.ok) throw new Error(`Couldnot fetch data from ${BASE_URL}`);
        return res.json();
    } catch (error) {
        console.error(error.message);
    }
};

const cardCreater = () => {
    const generateBookCard = (bookData) => {
        const { work } = bookData;
        return `<div class="card col-4 p-3">
      <div class="card_image__box">
        <img class="card_image" src="${BASE_URL_IMG}/${work.cover_edition_key}.jpg">
      </div>
      <h3 class="card_title">${work.title}</h3>
      <p class="card_name">${work.author_names[0]}</p>
      <p class="card_date">${work.first_publish_year}</p>
      <div class="card_btn__group">
        <button class="card_button btn btn-warning bookmark">Bookmark</button>
        <button class="card_button card_button__2 btn btn-outline-info">More info</button>
      </div>
      <a href="#"><button class="secondary btn btn-secondary">Read</button></a>
    </div>`;
    };

    fetchData().then((books) => {
        const booklist = books.reading_log_entries;
        booklist.slice(0, 6).forEach((book) => {
            const cardHTML = generateBookCard(book);
            dataList.innerHTML += cardHTML;
            console.log(book);
        });
    });
};

cardCreater();

dataList.addEventListener("click", function (event) {
  const moreInfoButton = event.target.closest(".bookmark");
  if (moreInfoButton) {
      handleMoreInfoClick(event);
  }
});

const handleMoreInfoClick = (event) => {
  const card = event.target.closest(".card");
  if (!card) return;

  const authorElement = card.querySelector(".card_name");
  const titleElement = card.querySelector(".card_title");

  const author = authorElement.textContent;
  const title = titleElement.textContent;

  const navItem = document.createElement("li");
  navItem.classList.add("navbar_item");
  navItem.innerHTML = `<div>
    <h2 class="navbar_item__title">${title}</h2>
    <p class="navbar_item__subtitle">Author: ${author}</p>
  </div>
  <div class="navbar_img_group">
    <button class="navbar_img"><img src="./assets/image/icon/book-open 1.svg" alt="book"></button>
    <button class="navbar_img--2"><img src="./assets/image/icon/delete 1.svg" alt="delete"></button>
  </div>`;

  listContent.appendChild(navItem);

  const deleteButton = navItem.querySelector(".navbar_img--2");
  deleteButton.addEventListener("click", () => {
      navItem.remove();
  });
};

const searchInput = document.getElementById("searchcol");
const searchCard = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const cards = dataList.querySelectorAll('.card');

  cards.forEach((card) => {
    const title = card.querySelector('.card_title').textContent.toLowerCase();
    const subtitle = card.querySelector('.card_name').textContent.toLowerCase();
    
    if (title.includes(searchTerm) || subtitle.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
};

searchInput.addEventListener('input', searchCard);