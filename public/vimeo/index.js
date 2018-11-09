let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo("309c392928aa922eeb22c6b2e0de466a9476fc31", "99Ix1CmF1HTrd0wCtINDQdQ/Jwv+QKOeKBDbzKKjfA8fMU6NejXMoGj/yh+lOgAXQ9GLQaHnDBP4Lfh0SkVvqMYxBwatMDaqqZr6REC4iJUiSczVMoVqRSBtCLDB2noQ", "e0d50343145fee2b793fe1e50be6453e");

client.request({
  method: 'GET',
  path: '/tutorial'
}, function (error, body, status_code, headers) {
  if (error) {
    console.log(error);
  }

  console.log(body);
})

var url = client.buildAuthorizationEndpoint(redirect_uri, scopes, state)