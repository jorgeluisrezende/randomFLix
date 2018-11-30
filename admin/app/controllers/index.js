const fetch = require('node-fetch');

module.exports.index = function(app,req,res){
    if(req.session.autentic){
        app.get('localhost:9000/home/:p', (req, res) => {
            console.log(req.query);
            console.log(req.params.p);
          });
        async function getMovies(){
    
            const limit = 9;
            const offset = 0;
            let currentPage = 9;
            console.log(currentPage)
            const response = await fetch(`http://localhost:8000/api/admin/getFilmes/${limit}/${offset}`);
            const movie = await response.json();
            let numberOfPages = Object.values(movie.totPag[0]);
            numberOfPages = Math.ceil(numberOfPages/limit);
            res.render('index',{"movies":movie,'numberOfPages':numberOfPages,'currentPage':currentPage,'session':req.session});
            return;
        }    
       getMovies();
       
    }else{
        res.send('Faca o Login');
    }
}