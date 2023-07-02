const documentForm = document.querySelector(".form"),
  nameField = documentForm.querySelector("div> .nombre"),
  emailField = documentForm.querySelector("div> .email"),
  subjectField = documentForm.querySelector("div> .asunto"),
  messageField = documentForm.querySelector("div> .mensaje"),
  nameFieldError = documentForm.querySelector(".name-error"),
  emailFieldError = documentForm.querySelector(".email-error"),
  subjectFieldError = documentForm.querySelector(".subject-error");

documentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameField.value,
    email = emailField.value,
    subject = subjectField.value,
    message = messageField.value,
    serviceId = "service_28miuuk",
    templateId = "template_5qrqyi2";

  const nameFilter = elementIsBlank(nameField, nameFieldError),
    emailFilter = elementIsBlank(emailField, emailFieldError),
    subjectFilter = elementIsBlank(subjectField, subjectFieldError),
    validEmailFilter = checkEmail(emailFieldError, emailField);

  if (!nameFilter && !emailFilter && !subjectFilter && validEmailFilter) {
    console.log("Submit");
    var templateParams = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };

    emailjs.send(serviceId, templateId, templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  }
});

function elementIsBlank(elementField, errorMessage) {
  if (elementField.value === "") {
    elementField.classList.add("invalid");
    errorMessage.classList.add("invalid");
    return true;
  }
  elementField.classList.remove("invalid");
  errorMessage.classList.remove("invalid");
  return false;
}

function checkEmail(fieldElement, element) {
  const emaiPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!element.value.match(emaiPattern)) {
    element.classList.add("invalid");
    fieldElement.classList.add("invalid"); //adding invalid class if email value do not mathced with email pattern
    return false;
  }
  element.classList.remove("invalid");
  fieldElement.classList.remove("invalid"); //removing invalid class if email value matched with emaiPattern
  return true;
}
