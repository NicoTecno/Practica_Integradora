let socket = io();
let user = "";
let chatBox = document.getElementById("chatbox");

Swal.fire({
  title: "Identificación",
  input: "text",
  text: "Por favor ingrese su nombre",
  inputValidator: (value) => {
    return !value.trim() && "Por favor ingrese su nombre!";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  document.getElementById("username").innerHTML = user;
  socket = io();
  //
  //
});

//ENVIAR MESANJES
chatBox.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", {
        user,
        message: chatBox.value,
      });
      chatBox.value = "";
    }
  }
});

//RECIBIR MENSAJES
socket.on("logs", (data) => {
  const divLog = document.getElementById("messageLogs");
  let messages = "";

  data.forEach((message) => {
    messages += `<p><i>${message.user}</i>: ${message.message}</p>`;
  });
  divLog.innerHTML = messages;
});
