let nominations = [];
/** funtion that takes in a word and looks for it using the OMDB API.
	Then, it generates HTML using the data recieved.
*/
function getMovie(movieName){
	let req = new XMLHttpRequest();
			req.onreadystatechange = function() {
				if(this.readyState==4 && this.status==200){
					let result = JSON.parse(this.responseText);
					let searchResults = document.getElementById("searchResults");
					searchResults.innerHTML = "";
					console.log(result["Search"]);
					result["Search"].forEach((elem) => {
						let container = document.createElement('div');
						let title = document.createElement('h3');
						let year = document.createElement('h3');
						title.id =elem["Title"];
						year.innerHTML = "Year: " + elem['Year'];
						let img = document.createElement('img');
						let button = document.createElement("button");
						button.type = "button";
						button.innerHTML = "Nominate";
						button.id = elem["Title"];
						button.onclick =nominateMovie;
						if(nominations.includes(elem["Title"]))
							button.disabled = true;
						title.innerHTML = "Title: " +elem["Title"];
						if(elem["Poster"] !== "N/A"){
							img.src = elem["Poster"];
						}
						container.appendChild(title);
						container.appendChild(year);
						container.appendChild(img);
						container.appendChild(button);
						searchResults.appendChild(container);
					});
				}
			}
			req.open("GET", "https://www.omdbapi.com/?apikey=2ff93414&type=movie&s="+movieName);
			req.send();
}

function searchHandler(){
	let searchbar = document.getElementById("searchBar");
	getMovie(searchbar.value);
}
// This function basically handles the nominate button and then pushes the movie into the nominee list.
function nominateMovie(){
	if(nominations.length >= 5){
		alert("There are already 5 Movies in your list!");
	}
	else{
		this.disabled = true;
		nominations.push(this.id);
		renderNominations();
	}
}
//This function basically handles the Remove button and Removes the movie from the nominee list.
function removeMovies(){
	let checkbox = document.getElementsByName("nominee")
	for(let i = checkbox.length - 1; i >= 0; i--){
		if(checkbox[i].checked){
			nominations.splice(i, 1);
		}
	}
	renderNominations();
}
//This function generates the HTML in order to display the nominee list.
function renderNominations(){
	let container = document.getElementById("nominations");
	container.innerHTML = "";
	nominations.forEach((movie) => {
		let box = document.createElement("input");
		box.type = "checkbox";
		box.name = "nominee";
		box.id = "box";
		box.value = movie;
		let label = document.createElement('label');
		let br = document.createElement("br");
		label.innerHTML = movie;
		container.appendChild(label);
		container.appendChild(box);
		container.appendChild(br);
	});
	if(nominations.length === 5){
		document.getElementById('banner').style.display = "block";
	}
	if(nominations.length !== 5){
		document.getElementById('banner').style.display = "none";
	}	
}

function submit(){
	if(nominations.length < 5){
		alert("Please make sure you have added five movies to your list.");
	}
	else{
		alert("Thank you for submitting your nominations. Have a nice day!")
	}
}
