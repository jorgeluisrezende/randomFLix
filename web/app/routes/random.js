module.exports = (app)=>{
    app.get('/random',(req,res)=>{
        app.app.controllers.randomController.random(app,req,res);
    });

    

}