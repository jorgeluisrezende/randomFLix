const fetch = require('node-fetch');

module.exports.getLogin = (app,req,res)=>{
    console.log(req.session.autentic);
    res.render('login');
}


module.exports.isLogin = (app,req,res)=>{
    const post = 'http://localhost:8000/api/users';
    fetch(post,{
        method:'POST',
        body:JSON.stringify(req.body),
            headers:{
                'Content-Type':'application/json'
            }
    })
    .then((res)=>res.json())
        .then((json)=>{
            if(json.resultados.length > 0 ){
                req.session.autentic = true;
                req.session.user = json.resultados[0].nick;
            }
            console.log(req.session.autentic)
            if(req.session.autentic){
                res.redirect('/random');
            }else{
                res.redirect('/');
            }
        })
        .catch((e)=>console.log(e));
        
}