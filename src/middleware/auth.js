function auth(token) {

  //console.log("auth: " + token);

  let config = {
    method: 'post',    
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(this.props.params.id_token)
  }
  return fetch("https://seekerdnasecure.co.za:3002/token", config)
    .then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) => {
      if (!response.ok) {
        //console.log("!response.ok");
        return Promise.reject(json);
      }
      if (json.id_token) {
        //console.log("token: " + (json.id_token));
      };
      if (json.decoded) {
        //console.log("decode == true");
      };
      return true;
    })
    .then(response => response, error => error);
}

export default auth;