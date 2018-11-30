module.exports.random = (app,req,res)=>{
    if(req.session.autentic){
        res.render('random');
    }else{
        res.send('Faca o LOgin para entrar');
    }
}




