module.exports = (app)=>{
    app.get('/login',(req,res)=>{
        app.app.controllers.loginController.getLogin(app,req,res);
    });

    app.post('/login',(req,res)=>{
        app.app.controllers.loginController.isLogin(app,req,res);
    });
}