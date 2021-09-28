const apiKey = '23566762-6346aa8b21c47a7baaa4f58ee';

const form = document.querySelector('form');
form.onsubmit = async event =>{
	event.preventDefault();
	//a new search clears all images
	removeAllChildren(collage);
	const motive = form.elements.motive.value;
	let color = document.querySelector("#color");

	const params = new URLSearchParams({
		key: apiKey,
		q: motive,
		colors: color.value,
		per_page: 10
	})

	 const response = await fetch('https://pixabay.com/api/?' + params.toString());
	 const json = await response.json();

	 //testing OBS glöm ej att ta bort!
	 console.log(json);
	 console.log(collage.firstChild);
	
	for(let i = 0; i < json.hits.length; i++){
		var elem = document.createElement("img");
		elem.setAttribute("src", json.hits[i].webformatURL);
		elem.setAttribute("height", "500");
		elem.setAttribute("width", "500");
		document.getElementById("collage").appendChild(elem);
	}

	// a function to clear all images when we initiate a new search
	function removeAllChildren(parent){
		while(parent.firstChild){
			parent.removeChild(parent.firstChild);
		}
	}	
}