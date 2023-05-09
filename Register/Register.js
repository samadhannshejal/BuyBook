var registerButton = document.getElementById('RegisterButton');
const form = document.querySelector('form');
const nevigateToLogInPage = document.getElementById('neviaget');
let registeredDataFromRegisteredPage = JSON.parse(localStorage.getItem('RegisterData')) || [];
let id = 0;
nevigateToLogInPage.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = "../Login/Login.html"
  console.log(e)
})
registerButton.addEventListener('click', (e) => {
  e.preventDefault()
  const firstName = document.getElementById('RegisterInputName').value;
  const lastName = document.getElementById('RegisterInputLastName').value;
  const userName = document.getElementById('RegisterInputUserName').value;
  const email = document.getElementById('RegisterInputEmail').value;
  const password = document.getElementById('RegisterInputpassword').value;
  const reEnterPassword = document.getElementById('RegisterInputReEnterpassword').value;
  let userType = document.getElementById('AdminRadio').checked ? 'Admin' : 'User';
  let registrationInfo = {
    firstName,
    lastName,
    userName,
    email,
    password,
    reEnterPassword,
    userType,
    id,
    isActive: false,
  };
  function isStrongPassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;
    return regex.test(password);
  }
  function isStrongEmail(emails) {

    return (emails.includes("@gmail.com") || emails.includes('@GMAIL.COM'))
  }
  let isAlreadyRegistered = false;
  registeredDataFromRegisteredPage.forEach(user => {
    if ((user.email === email || user.userName === userName)) {
      isAlreadyRegistered = true;
    }
  });
  if (firstName == '') {
    const firstname = document.getElementById('firstNameReq');
    firstname.innerHTML = 'First Name is required';
    firstname.classList.add('red')
    return;
  } else {
    const firstName = document.getElementById('firstNameReq');
    firstName.innerHTML = '';

  }
  if (lastName === '') {
    const lastName = document.getElementById('lastNameReq');
    lastName.innerHTML = 'last Name is required';
    lastName.classList.add('red')
    return;
  } else {
    document.getElementById('lastNameReq').innerHTML = '';
  }
  if (userName === '') {
    const userName = document.getElementById('userNameReq');
    userName.innerHTML = 'user Name  is required';
    userName.classList.add('red')
    return;
  } else {
    document.getElementById('userNameReq').innerHTML = '';
  }

  if (email === '') {
    const email = document.getElementById('emailReq');
    email.innerHTML = 'email is required';
    email.classList.add('red')
    return;
  }
  else if (!isStrongEmail(email)) {
    const email = document.getElementById('emailReq');
    email.innerHTML = 'invalid email';
    email.classList.add('red');
    return;

  }
  else {
    document.getElementById('emailReq').innerHTML = '';
  }

  if (password === '') {
    const password = document.getElementById('passwordReq');
    password.innerHTML = 'password is required';
    password.classList.add('red')
    return;
  } else if (!isStrongPassword(password)) {
    const passwordReq = document.getElementById('passwordReq')
    passwordReq.innerHTML = 'Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character';
    passwordReq.classList.add('red')
    return;
  } else {
    document.getElementById('passwordReq').innerHTML = '';
  }

  if (reEnterPassword === '') {
    const reEnterpassword = document.getElementById('reEnterpasswordReq');
    reEnterpassword.innerHTML = 'reEnterpassword is required';
    reEnterpassword.classList.add('red')
    return;
  } else if (reEnterPassword !== password) {
    const reEnterpasswordReq = document.getElementById('reEnterpasswordReq');
    reEnterpasswordReq.innerHTML = 'Passwords do not match';
    reEnterpasswordReq.classList.add('red');

    return;
  } else {
    document.getElementById('reEnterpasswordReq').innerHTML = '';
  }
  if (isAlreadyRegistered) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: ` already registered!`,
    })
  } else if ((email.includes('@gmail.com') || email.includes('@GMAIL.COM')) && (password.length > 6 && (isStrongPassword(password))) && (reEnterPassword == password)) {
    id++;

    registeredDataFromRegisteredPage.push(registrationInfo);
    localStorage.setItem('RegisterData', JSON.stringify(registeredDataFromRegisteredPage));
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${userType} Registered Successfully`,
      showConfirmButton: false,
      timer: 1500
    })
  }
  form.reset()

})