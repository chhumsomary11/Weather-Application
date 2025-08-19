const inputCity = document.querySelector("#input-js");

const enterBtn = document.querySelector("#btn-js");
const weatherIcon = document.querySelector("#weatherIcon-js");
const temp = document.querySelector("#temp-js");
const city = document.querySelector("#city-js");
const time = document.querySelector("#currentTime-js");
const description = document.querySelector("#description-js");

const APIkey = "e8071cb2ea2ec54402256544158f297c";

function searchTrigger() {
	const cityName = inputCity.value.trim();
	inputCity.value = "";
	if (cityName) {
		fetchApi(cityName);
	}
}

//Event Manipulation for Input

inputCity.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		searchTrigger();
	}
});

//Event Manipulation for Btn

enterBtn.onclick = () => {
	searchTrigger();
};

function addIcon(weather) {
	weatherIcon.className = "";
	if (weather === "Clouds") {
		weatherIcon.classList.add("bi", "bi-cloud", "fs-1", "text-primary");
	} else if (weather === "Rain") {
		weatherIcon.classList.add(
			"bi",
			"bi-cloud-rain-fill",
			"fs-1",
			"text-primary"
		);
	} else if (weather === "Snow") {
		weatherIcon.classList.add(
			"bi",
			"bi-cloud-snow-fill",
			"fs-1",
			"text-primary"
		);
	} else if (weather === "Clear") {
		weatherIcon.classList.add(
			"bi",
			"bi-brightness-high",
			"fs-1",
			"text-warning"
		);
	} else {
		weatherIcon.classList.add("bi", "bi-cloud-haze2", "fs-1", "text-secondary"); // fallback
	}
}

//Function to Fetch Data
function fetchApi(location) {
	let APIUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${APIkey}&units=metric`;

	fetch(APIUrl)
		.then((resp) => resp.json())
		.then((data) => {
			if (data.cod !== "200") {
				alert("City not found. Please try again.");
				return;
			}
			addIcon(`${data.list[0].weather[0].main}`);
			temp.textContent = `${data.list[0].main.temp} C`;
			city.textContent = `${data.city.name} `;
			time.innerHTML = `${convertTime(data.list[0].dt_txt)} `;
			description.textContent = `${data.list[0].weather[0].description} `;
			console.log(data);
		})
		.catch((error) => {
			console.error("Error Fetching the data", error);
		});
}

// Function to convert time
function convertTime(APITime) {
	let date = new Date(APITime);
	return `${date.toDateString()} <br>  ${date.toLocaleTimeString()}`;
}
