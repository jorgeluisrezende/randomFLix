const fetch = require('node-fetch');

module.exports.cadastro = (app,req,res)=>{
    res.render('cadastro',({erro:{json:{status:{}}},cond:{}}));
}


module.exports.cadastrar = (app,req,res)=>{
    const post = 'http://localhost:8000/api/user/cadastrar/';
    
    fetch(post,{
            method:'POST',
            body:JSON.stringify(req.body),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((json)=>{
            res.render('cadastro',({erro:{json},cond:{}}));
        })
        .catch((e)=>console.log(e));


}


    
    
