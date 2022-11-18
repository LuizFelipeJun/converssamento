function loginInsano() {
   var nomeUsuario = document.getElementById("nomeDoUsuario").value;
   localStorage.setItem("nomeUsuario", nomeUsuario);
   window.location = "kwitterRoom.html";
}