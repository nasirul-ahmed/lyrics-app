let btn = document.getElementById("submit");

var inp = document.getElementById("search");
var result = document.getElementById("result");
const chartList = [];

const getValue = () => {
  // var res = await fetch(
  //   "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=5&country=it&f_has_lyrics=1&apikey=78946b90b1ff58d9b860df9ddaa3b0c2",
  //   {
  //     headers: {
  //       apiKey: "78946b90b1ff58d9b860df9ddaa3b0c2",
  //       "Content-Type": "text/plain; charset=UTF-8",
  //     },
  //   }
  // );
  // var data = await res.json();
  // const { track_list } = data.message.body;

  result.innerHTML = "";
  // track_list.forEach((chart) => {

  for (let i = 1; i < 10; i++) {
    var li = document.createElement("li");

    chartList.push(li);
    li.innerHTML = `
      <div>
        ${"chart.album_name " +i }
      </div>
    `;
    // });
    result.appendChild(li);
  }
};
