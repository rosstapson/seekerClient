function auth(authToken) {
  return new Promise((resolve, reject) => {
    // That server is gonna take a while
    setTimeout(() => {
      if(authToken === 'pancakes') {
        resolve('authenticated')
      } else {
        reject('nope')
      }
    }, 200)
  })
}

export default auth;