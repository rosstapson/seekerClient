function getAssetsForUsername(username) {

  console.log("getAssetsForUsername: " + username);

  let config = {
    method: 'post',    
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(username)
  }
  return fetch("http://seekerdnasecure.co.za:3001/assets", config)
    .then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) => {
      if (!response.ok) {
        console.log("!response.ok");
        return Promise.reject(json);
      }
      
      
      return json.assets;
    })
    .then(response => response, error => error);
}

export default getAssetsForUsername;