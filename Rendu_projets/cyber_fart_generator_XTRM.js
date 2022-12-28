const axios = require("axios"); // Permet de requierer l'Outil "Axios" - Pour utilisé l'API
const OSCServer = require("./oscServer"); // Permet de requierer l'Outil OSC - Pour liée sur Pure Data

const address = 'localhost'; // Permet de se connecter au serveur local, c'est a dire notre propre PC
const port = 3001; // Port de connexion

const oscServer = new OSCServer(port, address); // Permet d'ouvrir le Serveur OSC

const options = { // Toutes les données de l'API sont ici.
    method: 'GET', // Permet de prendre des données API
    url: 'https://weatherapi-com.p.rapidapi.com/current.json', // Liens de l'API.
    params: {q: 'Rennes'}, // Choix de la Ville 
    headers: {
      'X-RapidAPI-Key': 'b1ad918ba5msh3c0ab9e6425505fp173eb1jsn7ddc110d1e29',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
};

axios.request(options).then(function (response) { // Requete l'API
	console.log(response.data); // Permet d'afficher nos données dans le cmd.
    oscServer.sendMsg('wind', response.data.current.wind_kph); // Envoie un méssage sur le serveur OSC pour aller dans Pure Data où le parametre se nomme "wind"
}).catch(function (error) { 
	console.error(error);
});