// const addBtns = document.querySelectorAll(".card_button--1");
// const listContainer = document.querySelector(".navbar_list");

// addBtns.forEach(addBtn => {
//     addBtn.addEventListener('click', setNewLink);
// });

// function setNewLink(e) {
//     const card = e.target.closest(".card");
//     if (card) {
//         const title = card.querySelector(".card_title").textContent;
//         const name = card.querySelector(".card_name").textContent;

//         let newItem = document.createElement("li");
//         newItem.classList.add("d-flex-c");
//         newItem.style = "border-radius: 4px; background: #F8FAFD; gap: 40px; padding: 15px 10px; width: 218px;";

//         let newLeftDiv = document.createElement("div");
//         let newRightDiv = document.createElement("div");
//         newRightDiv.classList.add("d-flex-c");
//         newRightDiv.style.gap = "5px";

//         let newLefttitle = document.createElement("h4");
//         newLefttitle.textContent = title;

//         let newLeftsubtitle = document.createElement("p");
//         newLeftsubtitle.textContent = `${name}`;
//         newLeftsubtitle.classList.add("card_name")

//         let newRightRead = document.createElement("a");
//         newRightRead.setAttribute("href", "https://skillbox.ru/media/code/16-klassicheskikh-knig-dlya-programmista/");
//         newRightRead.setAttribute("target", "target");

//         let newRightDel = document.createElement("button");
//         let newReadImg = document.createElement("img");
//         newReadImg.setAttribute("src", "./assets/image/icons/book-open 1.svg");

//         let newDelImg = document.createElement("img");
//         newDelImg.setAttribute("src", "./assets/image/icons/delete 1.svg");
//         newDelImg.style = "background-color: #F8FAFD;";

//         newItem.append(newLeftDiv);
//         newItem.append(newRightDiv);
//         newLeftDiv.append(newLefttitle);
//         newLeftDiv.append(newLeftsubtitle);
//         newRightDiv.append(newRightRead);
//         newRightDiv.append(newRightDel);
//         newRightRead.append(newReadImg);
//         newRightDel.append(newDelImg);
//         listContainer.append(newItem);

//         newRightDel.addEventListener('click', () => {
//             newItem.remove();
//         });
//     }
// }

const logOut = document.getElementById("logout");
const backtolog = (ev) => {
  ev.preventDefault();
  window.location.href = "../../assets/pages/Login.html";
};

logOut.addEventListener("click", backtolog);

const dataList = document.getElementById("content");

fetch("https://openlibrary.org/people/mekBot/books/currently-reading.json")
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    console.log(data);
    data.reading_log_entries.slice(0, 12).forEach((item) => {
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
      yellowbtn.classList.add("card_button", "btn", "btn-warning","bookmark");
      yellowbtn.textContent = "Bookmark";
      lightbtn.classList.add(
        "card_button",
        "card_button--2",
        "btn",
        "btn-outline-info"
      );
      lightbtn.textContent = "More info";
      moreinfobtn.classList.add("secondary", "btn", "btn-secondary");
      moreinfobtn.textContent = "Read";
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
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  fetch("https://jsonplaceholder.typicode.com/photos")
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
     data.slice(0, 12).forEach((item) => {
      const imageVal = document.querySelector(".card_image");
      
     })
  });

  const addbtn = document.querySelector(".bookmark");
  const listcontent = document.querySelector(".navbar_list");

  