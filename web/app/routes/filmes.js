module.exports = (app)=>{
    app.post('/getFilmes',(req,res)=>{
        app.app.controllers.indexController.getFilmes(app,req,res);
    });

}