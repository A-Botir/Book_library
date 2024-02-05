const logOut = document.getElementById("logout");
const backtolog = (ev) => {
  ev.preventDefault();
  window.location.href = "../../assets/pages/Login.html";
};

logOut.addEventListener("click", backtolog);

const dataList = document.getElementById("content");
const listContent = document.querySelector(".navbar_list");
const search = document.getElementById("searchcol");

const addCardToListContent = (title, name) => {
  const navItem = document.createElement("li");
  navItem.classList.add("navbar_item");
  navItem.innerHTML = `<div>
  <h2 class="navbar_item__title">${title}</h2>
  <p class="navbar_item__subtitle">Author: ${name}</p>
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

const loadBookmarkData = () => {
  const existingDataJSON = localStorage.getItem("bookmarkData");
  if (existingDataJSON) {
    const existingData = JSON.parse(existingDataJSON);
    existingData.forEach((data) => {
      addCardToListContent(data.card_title, data.card_name);
    });
  }
};

const handleBookmarkClick = (item) => {
  const existingDataJSON = localStorage.getItem("bookmarkData");
  let existingData;
  if (existingDataJSON) {
    existingData = JSON.parse(existingDataJSON);
  } else {
    existingData = [];
  }
  existingData.push({
    card_title: item.work.title,
    card_name: item.work.author_names[0],
  });
  localStorage.setItem("bookmarkData", JSON.stringify(existingData));
  addCardToListContent(item.work.title, item.work.author_names[0]);
  console.log(localStorage.getItem("bookmarkData"));
};

loadBookmarkData();

fetch("https://openlibrary.org/people/mekBot/books/currently-reading.json")
  .then((resp) => resp.json())
  .then((bookData) => {
    return fetch("https://jsonplaceholder.typicode.com/photos")
      .then((resp) => resp.json())
      .then((imageData) => {
        bookData.reading_log_entries.slice(0, 12).forEach((item, index) => {
          let card = document.createElement("div");
          card.classList.add("card", "col-4", "p-3");
          let imagebox = document.createElement("div");
          imagebox.classList.add("card_image__box");
          let image = document.createElement("img");
          image.classList.add("card_image");
          let title = document.createElement("h3");
          title.textContent = item.work.title;
          title.classList.add("card_title");
          let firstname = document.createElement("p");
          firstname.textContent = item.work.author_names[0];
          firstname.classList.add("card_name");
          let firstdata = document.createElement("p");
          firstdata.textContent = item.work.first_publish_year;
          firstdata.classList.add("card_date");
          let btngroup = document.createElement("div");
          let yellowbtn = document.createElement("button");
          let lightbtn = document.createElement("button");
          let moreinfolink = document.createElement("a");
          moreinfolink.setAttribute("href", "#");
          let moreinfobtn = document.createElement("button");
          btngroup.classList.add("card_btn__group");
          yellowbtn.classList.add(
            "card_button",
            "btn",
            "btn-warning",
            "bookmark"
          );
          yellowbtn.textContent = "Bookmark";
          yellowbtn.addEventListener("click", () => handleBookmarkClick(item));

          lightbtn.classList.add(
            "card_button",
            "card_button--2",
            "btn",
            "btn-outline-info"
          );
          lightbtn.textContent = "More info";
          moreinfobtn.classList.add("secondary", "btn", "btn-secondary");
          moreinfobtn.textContent = "Read";

          let imageVal = document.querySelector(
            `.card_image`,
            `nth-child(${index + 1})`
          );
          if (imageVal) {
            imageVal.setAttribute("src", imageData[index].url);
          }

          dataList.appendChild(card);
          card.appendChild(imagebox);
          imagebox.appendChild(image);
          card.appendChild(title);
          card.appendChild(firstname);
          card.appendChild(firstdata);
          card.appendChild(btngroup);
          btngroup.appendChild(yellowbtn);
          btngroup.appendChild(lightbtn);
          card.appendChild(moreinfolink);
          moreinfolink.appendChild(moreinfobtn);
        });
      });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  document.addEventListener("DOMContentLoaded", function() { // ??
    const moreinfobtn = document.querySelector(".card_button--2");
    const rightSidebar = document.querySelector(".right_sidebar");
    const wrapper = document.querySelector(".wrapp");

    function dast() {
        rightSidebar.style.display = "block";
        wrapper.style.opacity = "0.5";
    }

    moreinfobtn.addEventListener("click", dast);
}); 