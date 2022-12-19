const firebaseConfig = {
  apiKey: "AIzaSyAa5Nv5_I60m1B3f9wPzK1W1sY0S4KsQjc",
  authDomain: "twitter-crackeado.firebaseapp.com",
  databaseURL: "https://twitter-crackeado-default-rtdb.firebaseio.com",
  projectId: "twitter-crackeado",
  storageBucket: "twitter-crackeado.appspot.com",
  messagingSenderId: "682928763708",
  appId: "1:682928763708:web:7babe582fe8bac1afc2439"
};
 
firebase.initializeApp(firebaseConfig);

var nomeDoUsuario = localStorage.getItem("nomeUsuario");
document.getElementById("nomeUsuario").innerHTML = "Bem-vindo(a) " + nomeDoUsuario + "!";

function addSala() {
  var nomeDaSala = document.getElementById("roomName").value;
  firebase.database().ref("/").child(nomeDaSala).update({
    purpose: "adicionando nome da sala"
  });
  localStorage.setItem("name", nomeDaSala);
  window.location = "kwitterPage.html"
}

function getDados() {
  firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";
  snapshot.forEach(function(childSnapshot) {childKey = childSnapshot.key;
  roomNames = childKey;
  var linha = "<div class = 'room_name' id = " + roomNames + " onclick = 'redirecionarParaONomeDaSala(this.id)'> #" + roomNames + "</div> <hr>";
  document.getElementById("salas").innerHTML += linha;
  });});
}

getDados();

function redirecionarParaONomeDaSala(nomeDaSala) {
  localStorage.setItem("nomeDaSala", nomeDaSala);
  window.location = "kwitterPage.html";
}

function logout_button() {
  localStorage.removeItem("nomeUsuario");
  localStorage.removeItem("nomeDasala");
  window.location = "index.html";
}