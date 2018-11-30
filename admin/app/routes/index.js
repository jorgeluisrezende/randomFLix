module.exports = function(app){
    app.get('/home',(req,res)=>{
        app.app.controllers.index.index(app,req,res);
    });



}