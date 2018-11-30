
const app = require('./app');
const connect = require('./server/dbConnection');


function UsuariosDAO(){


}

UsuariosDAO.prototype.insertUsu = (data)=>{
    const data = data;
    connect.query('SELECT email FROM users WHERE email ='+connect.escape(data.email),(err,result,fields)=>{
        if(err) throw err;
        if(result.length > 0){
          return false
        }else{
            connect.query('INSERT INTO users SET ?',data);
            return true
        }
    });

}

UsuariosDAO.prototype.getOI = (mensagem)=>{
    ()=>{
        return mensagem
    }
}

module.exports = ()=>{
    return UsuariosDAO;
}