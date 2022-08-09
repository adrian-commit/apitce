var express = require('express');
var mysql = require ('mysql');
var cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());

//establecemos los parametros de conexion
const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'taraguy_db'
});

conexion.connect(function(error){



    
    if(error){
        throw error;
    }else{
        console.log("conexion exitosa a la base de datos");
    }
});

app.get('/', function(req,res){
    res.send('ruta Inicio')
})

//Para que me traiga todos los registros (GET)
//Rutas de APIS//

//*1-tasks
//(localhost:3030/api/tasks/)//

app.get('/api/tasks',(req,res)=>{ 
    conexion.query('SELECT * FROM tasks LEFT JOIN clients ON tasks.client = clients.id  ',(error,filas) =>{
        if(error){
            throw error;
        }else{

            res.send(filas);
        }
    })
});



//Para que me traiga un solo registro
app.get('/api/tasks/:id',(req,res)=>{
    conexion.query('SELECT * FROM tasks WHERE id = ?', [req.params.id], (error, fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
            //res.send(fila[0].descripcion);
        }
    })
});

//*2-clients
//(localhost:3030/api/clients/)//

app.get('/api/clients',(req,res)=>{ 
    conexion.query('SELECT * FROM clients LEFT JOIN tasks ON clients.id = tasks.client',(error,filas) =>{
        if(error){
            throw error;
        }else{

            res.send(filas);
        }
    })
});


//Para que me traiga un solo registro
app.get('/api/clients/:id',(req,res)=>{
    conexion.query('SELECT * FROM clients WHERE id = ?', [req.params.id], (error, fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
            //res.send(fila[0].descripcion);
        }
    })
});

//*3-services
//(localhost:3030/api/services/)//

app.get('/api/services',(req,res)=>{ 
    conexion.query('SELECT * FROM services',(error,filas) =>{
        if(error){
            throw error;
        }else{

            res.send(filas);
        }
    })
});



//Para que me traiga un solo registro
app.get('/api/services/:id',(req,res)=>{
    conexion.query('SELECT * FROM services WHERE id = ?', [req.params.id], (error, fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
            //res.send(fila[0].descripcion);
        }
    })
});










//para crear datos en la base de datos (POST)

//*1-clients

//(localhost:3030/api/clients/)//

app.post('/api/clients/',(req,res)=>{
 
let data = {name:req.body.name, businessName:req.body.businessName, typePerson:req.body.typePerson, 
            cuit:req.body.cuit, officesQuantity:req.body.officesQuantity, staffQuantity:req.body.staffQuantity, 
            typeActivity:req.body.typeActivity, timeExerciseEnd:req.body.timeExerciseEnd};

let sql = "INSERT INTO clients SET ?";
    conexion.query(sql, data, function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
});

//para editar una articulo
app.put('/api/articulos/:id',(req,res)=>{
    let id = req.params.id;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let stock = req.body.stock;
    let sql = "UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?";
        conexion.query(sql, [descripcion, precio, stock, id], function(error, results){
            if(error){
                throw error;
            }else{
                res.send(results);
            }
        })
    });

//eliminar articulo
app.delete('/api/articulos/:id',(req,res)=>{
        conexion.query('DELETE FROM articulos WHERE id = ?', [req.params.id], function(error, filas){
            if(error){
                throw error;
            }else{
                res.send(filas);
            }
        })
    });


app.listen('3030', function(){
    console.log("Servidor Ok");
});
