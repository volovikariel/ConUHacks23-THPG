
// let password = "blade tiara"

// const data = new FormData();
// data.append("text", password);


// const options = {
// 	method: 'POST',
// 	headers: {
// 		'api-key': 'quickstart-QUdJIGlzIGNvbWluZy4uLi4K',
// 	},
// 	body: data
// };

// fetch('https://api.deepai.org/api/text2img', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


let imgholder = document.getElementById('imageholder')

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0d87ddd7b2mshad489fc5a592647p126cc2jsn6a5b89dbb984',
		'X-RapidAPI-Host': 'any-anime.p.rapidapi.com'
	}
};

fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
      .then(response => 
				response.json()
				)
      .then(json => {
				console.log(json);
				image = json[0].url;
      	console.log(image);
				imgholder.src = image;
			})
			.then()
      