module.exports = (app)=>{
    app.get('/filmes',(req,res)=>{
        app.app.controllers.filmesController.filme(app,req,res);
    });

    app.post('/upload',(req,res)=>{
        app.app.controllers.filmesController.upload(app,req,res);

    });
}