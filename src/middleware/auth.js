function auth(user) {

  console.log("auth: " + JSON.stringify(user));

  let config = {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: user
  }
  return fetch("http://localhost:3001/users", config)
    .then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) => {

      if (!response.ok) {
        console.log("!response.ok");
        return Promise.reject(json);
      }
      if (json.id_token) {
        console.log("token: " + (json.id_token));
      };
      return json;
    })
    .then(response => response, error => error);
}

export default auth;