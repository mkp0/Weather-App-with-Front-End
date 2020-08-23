console.log("we are on the client side");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value;
  fetch("/weather?city=" + city + "").then((res) => {
    msg1.textContent = "Loading....";
    res.json().then((data) => {
      if (data.Place) {
        msg1.innerHTML = data.Weather + "</br>" + data.Place;
      }

      if (data[0].error) {
        // console.log(data[0].error);
        mgs1.textContent = "";
        msg2.textContent = data[0].error;
      }
    });
  });
});
