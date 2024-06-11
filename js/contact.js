document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    // Validação básica
    if (!name || !email || !subject || !message) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Escapando os dados para evitar XSS
    function escapeHTML(string) {
      return string
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    var templateParams = {
      name: escapeHTML(name),
      email: escapeHTML(email),
      subject: escapeHTML(subject),
      message: escapeHTML(message),
    };

    var sendMessageButton = document.getElementById("sendMessageButton");
    sendMessageButton.disabled = true;

    emailjs
      .send("service_m720cf9", "portfolio_form", templateParams)
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          var successDiv = document.getElementById("success");
          successDiv.innerHTML =
            "<div class='alert alert-success'>" +
            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
            "<strong>Sua mensagem foi enviada. </strong></div>";
          document.getElementById("contact-form").reset();
        },
        function (error) {
          console.log("FAILED...", error);
          var successDiv = document.getElementById("success");
          successDiv.innerHTML =
            "<div class='alert alert-danger'>" +
            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
            "<strong>Desculpe " +
            escapeHTML(name) +
            ", parece que nosso servidor de e-mails não está respondendo. Por favor, tente novamente mais tarde!</strong></div>";
          document.getElementById("contact-form").reset();
        }
      )
      .finally(function () {
        setTimeout(function () {
          sendMessageButton.disabled = false;
        }, 1000);
      });
  });

  document.getElementById("name").addEventListener("focus", function () {
    document.getElementById("success").innerHTML = "";
  });
});
