export { menu };

let username = localStorage.getItem('username');

const menu = () => `<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">HOME</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/allgames">GAMES</a>
          </li>
          <li class="nav-item">
          <a class="nav-link" href="#/login">LOGIN</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="#/register">REGISTRARSE</a>
      </li>
        <li class="nav-item">
          <a class="nav-link" href="#/logout">LOGOUT</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" id="username" href="#">${username}</a>
      </li> 
        </ul>
      </div>
    </div>
  </nav>`;
