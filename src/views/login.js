import { loginUser, } from '../services/users.js';

export { loginForm };

function loginForm() {
  const divLogin = document.createElement('div');
  divLogin.classList.add('formulari_centrat');

  divLogin.innerHTML = ` <h1 class="h1-registro"> Loguearse aqui!!!</h1> <br><br><br><br>  <form>
  <div class="mb-3">
    <label for="loginpassword" class="form-label">Email</label>
    <input type="email" class="form-control" id="loginemail" aria-describedby="emailHelp">

  </div>
  <div class="mb-3">
    <label for="loginpassword" class="form-label">Password</label>
    <input type="password" class="form-control" id="loginpassword">
  </div>
  <button type="submit" id="loginbutton" class="btn btn-primary">Submit</button>
  <div id="errors"></div>
  </form>`;

  divLogin.querySelector('#loginbutton').addEventListener('click', async (event) => {
    event.preventDefault();
    const email = divLogin.querySelector('#loginemail').value;
    const password = divLogin.querySelector('#loginpassword').value;
    loginUser(email, password).then((status) => {
      if (status.success){
       window.location.hash = '#/';
       window.location.reload();
      }
      else {
        divLogin.querySelector('#errors').innerHTML = "Correo o contraseña incorrectos";
      }
    });
  });


  return divLogin;
}