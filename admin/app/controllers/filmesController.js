

module.exports.filme = (app,req,res)=>{
    if(req.session.autentic){
        res.render('filmes');
    }else{
        res.send("Faca o login");
    }
    
}

