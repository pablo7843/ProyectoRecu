export {supaRequest, loginSupabase, signUpSupabase, logoutSupabase, createData, getData};
const SUPABASE_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0and5b2N2bm5ueGJ4d3R3enNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjYzMzAsImV4cCI6MjAxNDg0MjMzMH0.WlMeYCDWudOonvOLKxr-v0R9Ah3xaWN12eJCGwSjU08";
const urlBase = "https://ftjwyocvnnnxbxwtwzsf.supabase.co";
const headers = {
  apiKey: SUPABASE_KEY,
  "Content-Type": "application/json",
};

async function supaRequest(url, method, headers, body) {
  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body), // En cas d'enviar dades per post, put patch...
  });
  if (response.status >= 200 && response.status <= 300) { // En cas d'error en el servidor
    if (response.headers.get('content-type')) {
      // Si retorna un JSON
      return await response.json();
    }
    return {}; // Si no contesta res no té content-type i cal retornar un objecte buit per a ser coherent en l'eixida.
  }

  return Promise.reject(await response.json()); // En cas de problemes en el servidor retornen un reject.
}

async function loginSupabase(email, password) {
  const url = `${urlBase}/auth/v1/token?grant_type=password`;
  const data = await supaRequest(url, 'post', headers, { email, password });
  return data;
}

async function signUpSupabase(email, password) {
  const url = `${urlBase}/auth/v1/signup`;
  const data = await supaRequest(url, 'post', headers, { email, password });
  return data;
}

async function logoutSupabase(token) {
  const url = `${urlBase}/auth/v1/logout`;
  const headersAux = { ...headers, Authorization: `Bearer ${token}` };
  const data = await supaRequest(url, 'post', headersAux, {});
  let username = localStorage.getItem("username");
  if(username == "" || username == null){
    username = "Desconocido";
  }
  
  return data;
}

async function createData(URI, token, data) {
  const url = `${urlBase}/rest/v1/${URI}`;
  const headersAux = {
    ...headers,
    Authorization: `Bearer ${token}`,
    Prefer: 'return=representation',
  };
  const response = await supaRequest(url, 'post', headersAux, data);
  return response;
}
async function getData(URI, token) {
  const url = `${urlBase}/rest/v1/${URI}`;
  const headersAux = { ...headers, Authorization: `Bearer ${token}` };
  const data = await supaRequest(url, 'get', headersAux);
  return data;
}