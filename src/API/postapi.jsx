
const isLocalhost= Boolean(
    window.location.hostname === 'localhost' || window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)){3}$/
    )
  )
  const url=isLocalhost ? "http://localhost:8000" : "https://ethioautomotiveAPI.ethioautomotive.com";
  


module.exports = {

    postBlog: url + "/postblog",
    login: url + "login",
    addAdds : url + "addAdds",
    getcomment: url + "getcomment",
    
    
};