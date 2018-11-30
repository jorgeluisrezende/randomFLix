const fetch = require('node-fetch');

module.exports.index = function(app,req,res){
    res.render('login',{erros:{}});
    
}

module.exports.autenticar = function(app,req,res){

    const dadosForm = req.body;

    req.assert('email','Email nao pode estar vazio!').notEmpty();
    req.assert('senha','Senha nao pode estar vazio!').notEmpty();
    

    const erros = req.validationErrors();
    console.log(erros);

    if(erros){
        res.render('login',{erros:erros})
        return;
    }

    const post = 'http://localhost:8000/api/admin';
    fetch(post,{
        method:'POST',
        body:JSON.stringify(dadosForm),
            headers:{
                'Content-Type':'application/json'
            }
    })
    .then((res)=>res.json())
        .then((json)=>{
            if(json.resultados.length > 0){
                req.session.autentic = true;
                req.session.user = dadosForm.email
            }
            if(req.session.autentic){
                res.redirect('/home');
            }else{
                res.redirect('/admin');
            }

        })
        .catch((e)=>console.log(e));

}