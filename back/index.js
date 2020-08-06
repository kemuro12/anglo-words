const express = require('express');
const app = express();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
app.use(cookieParser('secret key'));

const crypto = require('crypto');
app.use(express.json());

const connectionOptions = {
    host : "localhost",
    user : "mysql",
    password : "mysql",
    database : "anglo-words"
}

let connection = null;

function connect(callback=null){
    console.log("MYSQL TAKE CONNECT");
    connection=mysql.createConnection(connectionOptions);
    connection.on('error', function(err) {
      console.log("---" +err.message);
      console.log("---" +err.code);
    });

}

connect();

const defaultWordsPageSize = 10;
const defaultVocsPageSize = 5;



const createResponse = (res, statusCode, message = "", data = {}) => {
	res.header("Access-Control-Allow-Origin","http://localhost:3000");
    res.header("Access-Control-Allow-Credentials","true");
	res.header("Access-Control-Allow-Headers","Content-Type");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    return {
        statusCode,
        message,
        data
    }
}


app.options('*', (req, res) => {
	createResponse(res, 200)
	res.send();
});

/* AUTH API */
app.get('/auth/me', (req, res) => {
    connection.query(`SELECT * FROM users WHERE bearer_token='${req.cookies.bearer_token}'`,(err, result)=>{
        if(err){
            res.send(createResponse(res, 500, "server error"));
            return;
        } 

        if(result.length){
            res.send(createResponse(res, 201, "Success auth", {
                userId: result[0].userId,
                login: result[0].login,
                image: result[0].image
            }));
            return;
        }
        res.cookie("bearer_token", "", {maxAge: 0});
        res.send(createResponse(res, 401, "Fail auth"));
    });
})

app.post('/auth/login', (req, res) => {
    connection.query(`SELECT * FROM users WHERE login='${req.body.login}'`, (err, result) => {
        if(err){
            res.send(createResponse(res, 500, "server error"));
            return;
        } 

        if(result.length && result[0].pass === req.body.pass) {
            let token = crypto.randomBytes(64).toString('hex');
            connection.query(`UPDATE users SET bearer_token='${token}' WHERE userId = '${result[0].userId}'`);
            res.cookie("bearer_token", token);
            res.send(createResponse(res, 201, "Success login"));
            return;
        }
        res.send(createResponse(res, 401, "Incorrect login or password"));
    })
})

app.delete('/auth/logout', (req, res) => {
    connection.query(`UPDATE users SET bearer_token=NULL WHERE bearer_token='${req.cookies.bearer_token}'`,(err, result)=>{
        if(err){
            res.send(createResponse(res, 500, "server error"));
            return;
        } 

        if(result.changedRows){
            res.send(createResponse(res, 201, "Success logout"));
            return;
        }
        res.cookie("bearer_token", "", {maxAge: 0});
        res.send(createResponse(res, 401, "Fail logout"));
    });
})

app.post('/auth/registration', (req, res) => {
    res.send("registration");
})
/* END */



/* USER API */
app.get('/users/get', (req, res) => {
    connection.query(`SELECT * FROM users`,(err, result)=>{
        if(err){
            res.send(createResponse(res, 500, "server error"));
            return;
        } 

        let users = [];
        result.forEach(user => {
            users.push({
                userId: user.userId,
                login: user.login,
                image: user.image
            });
        })
        res.send(createResponse(res, 200, "ok",{users}));
    })
})

app.get('/users/get/:id', (req, res) => {
    connection.query(`SELECT * FROM users WHERE userId='${req.params.id}'`,(err, result)=>{
        if(err){
            res.send(createResponse(res, 500, "server error"));
            return;
        } 

        if(result.length){
            res.send(createResponse(res, 200, "ok",{
                userId: result[0].userId,
                login: result[0].login,
                image: result[0].image
            }));
            return;
        }
        res.send(createResponse(res, 401, `User with id = ${req.params.id} does not exist`));
    })
})

app.put('/users/update', (req, res) => {
    connection.query(`UPDATE users SET image='${req.body.image}' WHERE bearer_token='${req.cookies.bearer_token}'`,(err, result)=>{
        if(err){
            res.send(createResponse(res, 500, "server error"));
            return;
        } 

        if(result.changedRows){
            res.send(createResponse(res, 201, "Success Update"));
            return;
        }
        res.send(createResponse(res, 401, "Fail update"));
    });
})
/* END */



/* VOCABULARY API */
app.get('/vocabulary/get', (req, res) => {
    connection.query(`SELECT * FROM vocabulary`,(err, result)=>{
        if(err){
            res.send(createResponse(res, 500, "server error"));
            return;
        } 

        let vocs = [];
        result.forEach(voc => vocs.push(voc));

        res.send(createResponse(res, 200, "ok", {vocs}));
    })
})

app.get('/vocabulary/user/:userId', (req, res) => {
    let page = req.query.page - 1;
    let countOfVocs = 0;
    connection.query(`SELECT COUNT(*) FROM vocabulary WHERE ownerId=${req.params.userId}`,(err ,res ) => {
        countOfVocs = res[0]["COUNT(*)"]; 
    })

    if(page === -1) 
    connection.query(`SELECT * FROM vocabulary WHERE ownerId='${req.params.userId}'`,(err, result) => {
        res.send(createResponse(res, 200, "ok", {
            vocs: result, 
            pageOptions: {
                countOfVocs: countOfVocs,
                pageSize: defaultVocsPageSize
            }
        }));
        return;
    })
    else
    connection.query(`SELECT * FROM vocabulary WHERE ownerId='${req.params.userId}' LIMIT ${page * defaultVocsPageSize},${defaultVocsPageSize}`,(err, result)=>{
        if(err){
            res.send(createResponse(res, 500, "server error"));
            return;
        } 
 
        if(result){
            res.send(createResponse(res, 200, "ok", {
                vocs: result, 
                pageOptions: {
                    countOfVocs: countOfVocs,
                    pageSize: defaultVocsPageSize
                }
            }));
            return;
        }
        
        res.send(createResponse(res, 401, "Some error"));
    })
})

app.get('/vocabulary/get/:id', (req, res) => {
    connection.query(`SELECT * FROM vocabulary WHERE id='${req.params.id}'`,(err, result)=>{
        if(err){
            res.send(createResponse(res, 500, "server error"));
            return;
        } 

        if(result.length){
            res.send(createResponse(res, 200, "ok", result[0]));
            return;
        }
        res.send(createResponse(res, 401, "Dont have vocabulary with id = "+req.params.id));
    })
})

app.get('/vocabulary/words/:id', (req, res) => {
    let page = req.query.page - 1;
    let countOfWords = 0;
    connection.query(`SELECT COUNT(*) FROM words WHERE voc_id=${req.params.id}`,(err ,res ) => {
        countOfWords = res[0]["COUNT(*)"]; 
    })

    connection.query(`SELECT * FROM words WHERE voc_id='${req.params.id}' LIMIT ${page * defaultWordsPageSize},${defaultWordsPageSize}`,(err, result)=>{
        if(err){
            res.send(createResponse(res, 500, "server error"));
            return;
        } 

        if(result){
            res.send(createResponse(res, 200, "ok", {
                words: result,
                pageOptions: {
                    countOfWords: countOfWords,
                    pageSize: defaultWordsPageSize
                }
            }));
            return;
        }

        res.send(createResponse(res, 401, "Some error"));
    })
})

app.get('/vocabulary/words',(req, res) => {
    if(!req.query.voc_id) res.send(createResponse(res, 401, "Some error"));
    let mas = [];
    if(typeof(req.query.voc_id) === typeof("H")) mas = req.query.voc_id;
    else mas = req.query.voc_id.join(",");
    connection.query(`SELECT * FROM words WHERE voc_id IN(${mas})`,(err, result)=>{
        if(err){
            res.send(createResponse(res, 500, "server error"));
            return;
        } 
  
        res.send(createResponse(res, 200, "ok", result));
        return;
    })
})

app.post('/vocabulary/create', (req, res) => {
    try{
        connection.query(`INSERT INTO vocabulary (id, title, description, ownerId, isPrivate, wordsCount)
        VALUES (NULL, '${req.body.title}', '${req.body.description}', '${req.body.ownerId}', '${req.body.isPrivate}', 0)`,(err, result)=>{
            if(result.affectedRows){
                res.send(createResponse(res, 200, "Voc was created with id = "+result.insertId, {id: result.insertId}));
                return;
            }
        })
    }catch(e){
        res.send(createResponse(res, 401, "Some error"));
    }
    
})

app.delete('/vocabulary/delete/:id', (req, res) => {
    try{
        connection.query(`SELECT * FROM users WHERE bearer_token='${req.cookies.bearer_token}'`,(err, result)=>{
            if(result.length === 0){
                res.send(createResponse(res, 401, "Unathorized"));
                return
            }
   
            connection.query(`DELETE FROM vocabulary WHERE id='${req.params.id}'`,(err1, result1)=>{
                connection.query(`DELETE FROM words WHERE voc_id='${req.params.id}'`,(err3, result3)=>{
                    res.send(createResponse(res, 200, "Voc was deleted with id = " + req.params.id));
                    return;
                })  
            })
        });
    }catch(e){
        res.send(createResponse(res, 401, "Some error"));
    }  
})

app.put('/vocabulary/update/:id', (req, res) => {
    connection.query(`UPDATE vocabulary SET title='${req.body.title}', description='${req.body.description}', 
    isPrivate='${req.body.isPrivate}', wordsCount='${req.body.wordsCount}' WHERE id='${req.params.id}'`,(err, result)=>{
        if(err){
            res.send(createResponse(res, 500, "server error"));
            return;
        } 

        if(result.affectedRows){
            res.send(createResponse(res, 201, "Success Update"));
            return;
        }
        res.send(createResponse(res, 401, "Fail update"));
    });
})
/* END */



/* WORD API */
app.post('/words/create', (req, res) => {
    connection.query(`INSERT INTO words (id, voc_id, word_eng, word_ru)
        VALUES (NULL, '${req.body.voc_id}', '${req.body.word_eng}', '${req.body.word_ru}')`,(err, result)=>{
        if(err){
            res.send(createResponse(res, 500, "server error"));
            return;
        } 

        if(result.affectedRows){
            res.send(createResponse(res, 200, "word was created with id = "+result.insertId, {wordId: result.insertId}));
            return;
        }
        res.send(createResponse(res, 401, "Some error"));
    })
})

app.put('/words/update/:id', (req, res) => {
    connection.query(`UPDATE words SET word_eng='${req.body.word_eng}', word_ru='${req.body.word_ru}' 
    WHERE id='${req.params.id}'`,(err, result)=>{
        if(err){
            res.send(createResponse(res, 500, "server error"));
            return;
        } 

        if(result.affectedRows){
            res.send(createResponse(res, 201, "Success Update"));
            return;
        }
        res.send(createResponse(res, 401, "Fail update"));
    });
})

app.delete('/words/delete/:id', (req, res) => {
    console.log(req.params.id)
    connection.query(`DELETE FROM words WHERE id='${req.params.id}'`,(err, result)=>{
        if(err){
            res.send(createResponse(res, 500, "server error"));
            return;
        } 

        if(result.affectedRows){
            res.send(createResponse(res, 200, "word was deleted with id = " + req.params.id));
            return;
        }
        res.send(createResponse(res, 401, "Some error"));
    })
})
/* END */

app.listen(4040, (err) => {
    console.log("server run on port 4040");
})