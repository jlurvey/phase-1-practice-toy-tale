let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById('toy-collection');

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  

  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => {
    toys.forEach(toy => {
      const card = createToyCard(toy);
      toyCollection.appendChild(card)
    });
  });

  function createToyCard(toy) {
    const card = document.createElement("div");
    card.classList.add("card");

    const name = document.createElement("h2");
    name.textContent = toy.name;

    const image = document.createElement("img");
    image.src = toy.image;
    image.classList.add("toy-avatar");

    const likes = document.createElement("p");
    likes.textContent = toy.likes + " Likes";

    const likeBtn = document.createElement("button");
    likeBtn.classList.add("like-btn");
    likeBtn.id = toy.id;
    likeBtn.textContent = "Like ❤️";

    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(likes);
    card.appendChild(likeBtn);

    return card;
  };


  const configurationObject = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": "Jessie",
      "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      "likes": 0
    })
  };

    fetch('http://localhost:3000/toys',configurationObject)
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        const card = createToyCard(toy);
        toyCollection.appendChild(card)
      });
    });
  likeBtn.addEventListener('click', () => {
    const newNumberOfLikes = toy.likes++
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify({
        "likes": newNumberOfLikes
      })
    })
    .then(response => response.json())
    .then((updatedToy) => {
      likes.textContent = updatedToy.likes + " Likes";
    })
  });

});
