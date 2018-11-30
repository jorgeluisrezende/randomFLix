const fetch = require('node-fetch');

function indexDAO (){

}

indexDAO.prototype.getFilmes = (res,categorias,categoriasGlobal)=>{
   const get = `http://localhost:8000/api/users/getFilmes/${categorias}`;
    async function getFilme(){
        const response  = await fetch(get);
        const movies = await response.json();


        res.render('filmes',{'movies':movies.resultados});
    }
    getFilme();
}

module.exports = function(){
    return indexDAO;
}