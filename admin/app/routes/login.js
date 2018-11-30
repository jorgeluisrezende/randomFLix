module.exports = (app)=>{
    app.get('/admin',(req,res)=>{
        app.app.controllers.login.index(app,req,res);
    });

    app.post('/autenticar',(req,res)=>{
        app.app.controllers.login.autenticar(app,req,res);
    });

}