const fetch = require('node-fetch');

var categoriasGlobal = '';
module.exports.home = (app,req,res)=>{
    const get = 'http://localhost:8000/api/user/getCategorias';
    async function getCategorias(){
        const response = await fetch(get);
        const categorias = await response.json();
        categoriasGlobal = categorias;
        
        res.render('index',{'categorias':categorias});
        return;
    }
    getCategorias();
}

module.exports.getFilmes = (app,req,res)=>{
    const categorias = req.body.generos;
    const indexDAO = new app.app.model.indexDAO();
    indexDAO.getFilmes(res,categorias,categoriasGlobal);    
}


module.exports.login = (app,req,res)=>{
    res.send('/login');
}

