function handleTogglePassword(e, id) {
  const inputPassword = document.getElementById(id);
  let isShowed = e.target.getAttribute("is_showed");
  if (isShowed) {
    e.target.removeAttribute("is_showed");
    e.target.setAttribute("src", "../assets/images/ph_eye-bold.svg");
    inputPassword.setAttribute("type", "password");
  } else {
    e.target.setAttribute("is_showed", true);
    e.target.setAttribute("src", "../assets/images/ph_eye-closed-bold.svg");
    inputPassword.setAttribute("type", "text");
  }
}

function handleSignUpSubmit(e) {
  e.preventDefault();

  console.log("first");

  const signUpForm = document.getElementById("signup__form");

  let formData = new FormData(signUpForm);

  if (formData.get("password") !== formData.get("confirm-password")) {
    alert("Please enter your password before submitting your account");
  } else {
    // Do submit form data through API request
    axios
      .post(`${env.DOMAIN_SERVER}:${env.PORT}/api/users`, {
        username: formData.get("username"),
        password: formData.get("password"),
      })
      .then(() => {
        window.location = "/login/login.html";
      })
      .catch((err) => console.log(err));
  }
}
