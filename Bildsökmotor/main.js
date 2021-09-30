const apiKey = '23566762-6346aa8b21c47a7baaa4f58ee';
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("previousBtn");
//a counter to keep track on what page we are on
var pageCounter = 1;

const mQuery = window.matchMedia('(max-width: 600px)');
const form = document.querySelector('form');



form.onsubmit = function(event){
	event.preventDefault();
	displayImagePage(1);
	prevBtn.style.display = "inline-block";
	prevBtn.disabled = true;
	nextBtn.style.display = "inline-block";
	//if we start a new search, pagenumber gets reset
	pageCounter = 1;
}

nextBtn.onclick = function(){
	pageCounter++;
	displayImagePage(pageCounter);
	prevBtn.disabled = false;
}

prevBtn.onclick = function(){
	if(pageCounter > 1){
		pageCounter--;
		displayImagePage(pageCounter);
		if(pageCounter == 1){
			prevBtn.disabled = true;
		}
	}
} 

async function displayImagePage(pageNr){
	//a new search clears all images
	removeAllChildren(collage);
	const motive = form.elements.motive.value;
	let color = document.querySelector("#color");

	const params = new URLSearchParams({
		key: apiKey,
		q: motive,
		colors: color.value,
		per_page: 10,
		page: pageNr
	})

	 const response = await fetch('https://pixabay.com/api/?' + params.toString());
	 const json = await response.json();

	var totalPages = Math.ceil(json.total / 10);

	//if we are at the last page we disable the next button otherwise we enable it
	if(pageNr >= totalPages){
		nextBtn.disabled = true;
	}
	else{
		nextBtn.disabled = false;
	}
	
	for(let i = 0; i < json.hits.length; i++){
		// container = img + text
		var container = document.createElement("container");

		// create image
		var img = document.createElement("img");
		img.setAttribute("src", json.hits[i].webformatURL);

		// if (mQuery.matches) { 
		// 	img.setAttribute("height", "300px");
		// 	img.setAttribute("width", "300px");
		// }
		// else{
		// 	img.setAttribute("height", "500px");
		// 	img.setAttribute("width", "500px");
		// }

		img.setAttribute("height", "350px");
		img.setAttribute("width", "350px");
		


		// create tag text
		var tagText = document.createElement("p");
		var tags = document.createTextNode(json.hits[i].tags);
		tagText.appendChild(tags);

		// create author text
		var authorText = document.createElement("p");
		var author = document.createTextNode("posted by: " + json.hits[i].user);
		authorText.appendChild(author);

		// insert image and text into container, with styles
		container.appendChild(img);
		container.appendChild(tagText);
		container.appendChild(authorText);
		img.style.objectFit = "cover";
		container.style.padding = "20px";
		container.style.margin = "10px";
		container.style.color = "white";
		container.style.backgroundColor = "black";
		container.style.outline = "solid white"
		container.style.maxWidth = "350px";
		tagText.style.textAlign = "center";
		authorText.style.textAlign = "center";
		tagText.style.fontSize = "1.5em";
		
		// if chosen color is transparent or grayscale,
		// make background gray to ensure visibility
		if(color.value == "transparent" || color.value == "grayscale"){
			container.style.backgroundColor = "gray";
		}
		else{
			container.style.backgroundColor = "black";
		}

		// insert container into collage
		document.getElementById("collage").appendChild(container);
	}

	//document.getElementById("collage").style.display = "inline-block";
	console.log(json);

	// a function to clear all images when we initiate a new search
	function removeAllChildren(parent){
		while(parent.firstChild){
			parent.removeChild(parent.firstChild);
		}
	}
}

