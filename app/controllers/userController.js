const express = require('express');
const jwt = require('jsonwebtoken');
const _app = express();
const User = require('./../models/users');
const datetime = require('node-datetime');
const md5hash = require('./../common/crypto');
const config = require('./../../config');

const dt= datetime.create();
const formmated= dt.format('Y-m-d H:M:S');
module.exports = (app, app2)=>{
    app.post('/setup', (req, res)=>{
        let nick = new User({
            name: req.body.name,
            password: md5hash(req.body.password),
            payload: true,
            createAt: formmated
        });

        nick.save((err)=>{
            if(err) throw err;

            console.log('Saved User');
            res.json({success: true});
        });
    });

    app.post('/authiencate', (req, res)=>{
        User.findOne({
            name: req.body.name
        }, (err, user)=>{
            if(err) throw err;

            if(!user) {
                res.json({success:true, message: 'Authiencated faild, user not found'});
            }else if(user){
                if(user.password != md5hash(req.body.password)){
                    res.json({
                        success: false, message: 'Authiencated faild, wrong password'
                    });
                }else{
                    const _payload = {
                        payload: user.payload
                    };
                    const token = jwt.sign(_payload, app2.get('superSecret'), {expiresIn:"1h"});
                    res.json({
                        success:true, message:"Enjoy your token: " + token
                    })
                }
            }
        })
    });

    app.use(require('./../common/jwtAuth'));

    app.get('/', (req, res)=>{
        res.send('Hello ExpressJS!');
    });

    app.get('/users', (req, res)=>{
        User.find({}, (err, user)=>{
            if(err) throw err;
            res.json(user);
        });
    });

    app.get('/user/:id', (req, res)=>{
        User.findById(req.params.id,(err, userdetail)=>{
            if(err) throw err;
            res.json(userdetail);
        });
    });

    app.post('/updateuser/:id',(req,res)=>{
        
    });
}