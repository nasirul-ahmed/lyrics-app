const url = window.location.href;
const urlParams = new URL(url);
const param = urlParams.searchParams.get("songId");

const div = document.getElementById("container-details");

const displaySongDetails=(data)=>{
    div.innerHTML = `
    <div class="song-image">
        <img
          src="${data.images.background}"
          alt="song thumbnail"
          width="400px"
         
        />
      </div>

      <div>
        <div class="song-title">
          <h4>Song Title</h4>
          <p>Song description</p>
        </div>
        <div class="lyrics">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
            blanditiis optio corrupti. Veritatis modi, quasi in vitae, corrupti
            similique voluptatem veniam fugiat sunt amet beatae odit sit aperiam
            maiores architecto?
          </p>
        </div>
      </div>
    `
}

const getSongDetails = async () => {
  await fetch(
    `https://shazam.p.rapidapi.com/songs/get-details?key=${param}&locale=en-US`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "shazam.p.rapidapi.com",
        "x-rapidapi-key": "3eb1ec397dmsh01279653e689a5fp164f4ejsne5861f860883",
      },
    }
  )
    .then((response) => response.json())
    .then((jsonData) => {
      console.log(jsonData);
      displaySongDetails(jsonData);
    })
    .catch((err) => {
      console.error(err);
    });
};

window.onload = () => {
  getSongDetails();
};
