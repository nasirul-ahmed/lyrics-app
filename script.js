var content = document.getElementById("content");
var recents = document.querySelector(".recents");
var loading = document.querySelector(".loading");
var seacrhText = document.getElementById("search");
var submit = document.getElementById("submit");
var songImage = document.querySelector("song-image");

const chartListURL =
  "https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0";

const songdata = [];

function removeDuplicates(arr) {
  return arr.filter((item, index) => item.key === arr[index].key);
}

function displayData(data) {
  loading.remove();
  const elements = document.getElementsByClassName("recents");
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }

  const ul = document.createElement("ul");
  ul.classList.add("recents");

  data.map((track) => {
    const li = document.createElement("li");
    li.classList.add("card");

    const img = document.createElement("img");
    img.classList.add("song-image");
    img.src = track.images.background;
    img.alt = "some things";
    li.appendChild(img);

    const divContainer = document.createElement("div");
    divContainer.classList.add("container");
    li.appendChild(divContainer);

    const titleText = document.createElement("p");
    const title = track.title;

    titleText.innerHTML = `<b>${
      title.length > 30 ? title.substring(0, 30) : title
    }</b>`;
    divContainer.appendChild(titleText);

    const subTitile = document.createElement("p");
    const subtitle = track.subtitle;
    subTitile.innerText =
      subtitle.length > 30 ? subtitle.substring(0, 15) : subtitle;
    divContainer.appendChild(subTitile);

    ul.appendChild(li);
  });
  content.appendChild(ul);
}

const searchSong = async (text) => {
  if (text.length <= 0) {
    displayData(recentSongData);
  } else {
    const songUrl = encodeURI(
      `https://shazam.p.rapidapi.com/search?term=${text}&limit=5`
    );

    const res = await fetch(songUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "shazam.p.rapidapi.com",
        "x-rapidapi-key": "3eb1ec397dmsh01279653e689a5fp164f4ejsne5861f860883",
      },
    })
      .then((response) => response.json())
      .then((v) => {
        const { hits } = v.tracks;
        songdata.slice(0, songdata.length);
        hits.map((hit) => {
          songdata.push(hit.track);
          console.log(hit);
        });

        displayData(removeDuplicates(songdata));
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const getRecentData = async () => {
  try {
    loading.innerHTML = `<h3 class="loading">Loading...</h3>`;
    const response = await fetch(chartListURL, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "shazam.p.rapidapi.com",
        "x-rapidapi-key": "3eb1ec397dmsh01279653e689a5fp164f4ejsne5861f860883",
      },
    });
    const result = await response.json();

    const { tracks } = result;

    songdata.slice(0, songdata.length);

    tracks.map((t) => songdata.push(t));

    displayData(removeDuplicates(songdata));
  } catch (error) {
    console.log(error);
  }
};
window.onload = getRecentData();

const getInputData = (e) => {
  const { value } = e.target;
  if (content.hasChildNodes()) {
    content.removeChild(content.childNodes[1]);
  }
  songdata.length = 0;

  if (value == "") {
    getRecentData();
  } else {
    searchSong(value);
  }
};

seacrhText.addEventListener("input", getInputData);
songImage.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href("song_details.html");
});

// const displaySearchedData = (data) => {
//   console.log(data);
//   loading.remove();
//   recents.remove();

//   const ul = document.createElement("ul");
//   ul.classList.add("recents");

//   data.map((track) => {
//     // console.log(track);

//     const li = document.createElement("li");
//     li.classList.add("card");

//     const img = document.createElement("img");
//     img.src = track.images.background;
//     img.alt = "some things";

//     li.appendChild(img);

//     const divContainer = document.createElement("div");
//     divContainer.classList.add("container");
//     li.appendChild(divContainer);

//     const titleText = document.createElement("p");
//     const title = track.title;

//     titleText.innerHTML = `<b>${
//       title.length > 30 ? title.substring(0, 30) : title
//     }</b>`;
//     divContainer.appendChild(titleText);

//     const subTitile = document.createElement("p");
//     const subtitle = track.subtitle;
//     subTitile.innerText =
//       subtitle.length > 30 ? subtitle.substring(0, 15) : subtitle;
//     divContainer.appendChild(subTitile);

//     ul.appendChild(li);
//   });
//   content.appendChild(ul);
// };
