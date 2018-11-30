module.exports = (app)=>{
    app.get('/',(req,res)=>{
        app.app.controllers.indexController.home(app,req,res);
    });

  
}