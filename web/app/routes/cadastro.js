module.exports = (app)=>{
    app.get('/cadastro',(req,res)=>{
        app.app.controllers.cadastroController.cadastro(app,req,res);
    });

    app.post('/cadastrar',(req,res)=>{
        app.app.controllers.cadastroController.cadastrar(app,req,res);
    })
}