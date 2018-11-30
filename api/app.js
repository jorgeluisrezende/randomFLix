const app = require('./server/server');
const connect = require('./server/dbConnection')();
const connectAdmin = require('./server/dbConncetionAdmin')();
const fs = require('fs');
const multiParty = require('connect-multiparty');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(multiParty());


var erros;
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers","content-type");
    res.setHeader("Access-Control-Allow-Credentials",true);
  
    next();
});





app.listen(8000,()=>{
    console.log("rodando na porta 8000")
});

app.get('/image/:imagem',(req,res)=>{
    let image = req.params.imagem;

    fs.readFile('./uploads/'+image,(err,content)=>{
        if(err){
            res.status(400).json(err);
            return;
        }

        res.writeHead(200,{'content-type':'image/jpg'});
        res.end(content);

    });
})


app.get('/api/user/getCategorias',(req,res)=>{
    connectAdmin.query('SELECT DISTINCT genero FROM filmes',(err,result)=>{
        if(err){
            res.status(500).json({'status':'Error'})
        }else{
            res.status(200).json({'resultados':result});
        }
    });
});



app.post("/api/users",(req,res)=>{
    const data = req.body;
    connect.query('SELECT nick,senha FROM users WHERE nick ='+connect.escape(data.nick)+"AND senha = "+connect.escape(data.senha),(err,result,fields)=>{
        if(err){
            throw err;
        }else{
            res.json({'resultados':result})
        }      
    });
    
});




app.post("/api/user/cadastrar/",(req,res)=>{ 
    
        
    const data = req.body;

    req.assert('nick', 'Nick não pode ser vazio').notEmpty();
	req.assert('email', 'Email não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazio').notEmpty();
    erros = req.validationErrors();

    if(erros.length > 0){
        res.json({'status':erros,err:'true'});
        console.log(erros.msg)
        return;
    }

    connect.query('SELECT email,nick FROM users WHERE email ='+connect.escape(data.email)+"OR nick = "+connect.escape(data.nick),(err,result,fields)=>{
        if(err) throw err;
        else if(result.length > 0){
            const resultados = result[0];
                if(resultados.nick == data.nick){
                    res.json({'status':'Ja existe esse nick cadastrado!',"success":false,err:'false'})
                    return
                }    
                res.json({'status':'Ja existe esse email cadastrado!',"success":false,err:'false'});
                return;
        }else{
            connect.query('INSERT INTO users SET ?',data,(err,results)=>{
                if(err){
                    res.json({"erros":erros,"success":false,err:'false'})
                    return;
                }
                res.json({"status":"Cadastrado com sucesso","success":true,err:'false'})
            });
          
        }
    });

});


/* request para adicionar os filmes */
app.post("/api/admin/filme",(req,res)=>{
   
    let date = new Date();
    let time_stamp = date.getTime();
    const url_image = time_stamp+'_'+ req.files.foto.originalFilename;
    var path_origem = req.files.foto.path;
    var path_destino = "./uploads/" + url_image;


    fs.rename(path_origem,path_destino,(err)=>{ 
        
        if(err){
            res.status(500).json({erros:err})
            return;
        }else{

            let data = {
                    dados:req.body
            };
            data.dados.foto = url_image;
            connectAdmin.query("INSERT INTO filmes SET ? ",data.dados,(err,results)=>{
                if(err){
                    res.status(500).json({erro:err})
                    return;
                }
                res.status(200).json({'status':'Inserido com sucesso'});

            });
        }
    });

});


/* request para buscar os filmes*/
app.get("/api/admin/getFilmes/:limit/:offset",(req,res)=>{
    const limit = req.params.limit;
    const offset = req.params.offset;
    let totPag;
    connectAdmin.query(`SELECT COUNT(*) FROM filmes`,(err,result)=>{
        
    
    connectAdmin.query(`SELECT * FROM filmes ORDER BY id desc LIMIT ${limit}`,(err,results)=>{
        if(err){
            res.status(500).json({erro:err});
            return;
        }else{
            res.status(200).json({'resultados':results,'totPag':result});
        }
    
    });
});


});

/* request para deletar filmes*/
app.delete(("/api/admin/deleteFilmes/:id"),(req,res)=>{
    const id = req.params.id;
    connectAdmin.query(`DELETE FROM filmes WHERE id = ${id}`,(err,results)=>{
        if(err){
            res.status(500).json({erro:err});
            return;
        }else{
            res.status(200).json({'status':"Sucesso ao excluir!"});
        }
    
    });
});

/* request para tratativas de login  */
app.post("/api/admin",(req,res)=>{
    const data = req.body;
   connectAdmin.query('SELECT email,senha FROM users WHERE email ='+connectAdmin.escape(data.email)+"AND senha = "+connectAdmin.escape(data.senha),(err,result,fields)=>{
        if(err){
            throw err;
        }else{
            res.json({'resultados':result})
        }      
    });
    
});



app.get('/api/users/getFilmes/:categorias',(req,res)=>{
    const categorias = req.params.categorias;
    connectAdmin.query(`SELECT * FROM filmes WHERE genero = '${categorias}' ORDER BY RAND() LIMIT 4`,(err,results)=>{
        if(err){
            res.status(500).json({"erro":"nao foi possivel"});
            return;
        }

        res.status(200).json({'resultados':results});
    });

});    