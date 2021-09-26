const apiKey = '23566762-6346aa8b21c47a7baaa4f58ee';

const form = document.querySelector('form');
form.onsubmit = async event =>{
	event.preventDefault();
	const motive = form.elements.motive.value;
	const color = document.getElementById("color").selected;

	const params = new URLSearchParams({
		key: apiKey,
		q: motive,
		colors: color,
		per_page: 10
	})

	 const response = await fetch('https://pixabay.com/api/?' + params.toString());
	 const json = await response.json();
}
