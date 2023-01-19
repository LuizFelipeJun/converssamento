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
var nome_da_sala = localStorage.getItem("nomeDaSala");

function enviar() {
  var menssagem = document.getElementById("msg").value;
  console.log(menssagem);
  firebase.database().ref(nome_da_sala).push({
    name: nomeDoUsuario,
    message: menssagem,
    like: 0
  });
  document.getElementById("msg").value = "";
}

function getDados() {
  firebase.database().ref("/" + nome_da_sala).on('value', function(snapshot) {document.getElementById("output").innerHTML = "";
  snapshot.forEach(function(childSnapshot) {childKey = childSnapshot.key;
    childData = childSnapshot.val(); 
  if(childKey!="purpose") {
    var id_menssagem_firebase = childKey;
    var dadoDaMenssagem = childData;
    var nomeusuario = dadoDaMenssagem["name"];
    var menssagem = dadoDaMenssagem["message"];
    var curtida = dadoDaMenssagem["like"];
    var nomeComTag = "<h4>" + nomeusuario + "<img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F54%2Faf%2Ff2%2F54aff2bf63fc8557cb8a9bc6f7f6e15a.png&f=1&nofb=1&ipt=32aa227f69a5e01a097817c2cc43a52a418ff53373b3a4cd0664f81a206ec84e&ipo=images'> </h4>";
    var menssagemComTag = "<h4>" + menssagem + "</h4>";
    var botao_de_like = "<button class='btn btn-primary' id=" + id_menssagem_firebase + " value=" + curtida + " onclick='atualiza_curtida(this.id)'";
    var spanComTag = "<span class='glyphicon glyphicon-thumbs-up'>like: " + like + "</span> </button> <hr>";
    var linha = nomeComTag + menssagemComTag + botao_de_like + spanComTag;
    document.getElementById("output").innerHTML += linha; 
  }
  });});
}

getDados();

function atualiza_curtida(id_da_menssagem) {
  var button_id = id_da_menssagem;
  var likes = document.getElementById(button_id).value;
  var att_like = Number(likes) + 1;
  firebase.database().ref(nome_da_sala).child(id_da_menssagem).update({
    like: att_like
  });
}

function logout_button() {
  localStorage.removeItem("nomeUsuario");
  localStorage.removeItem("nomeDasala");
  window.location = "index.html";
}