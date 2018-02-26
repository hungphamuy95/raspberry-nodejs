const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const config = require('./../../config');

app.set('superSecret', config.secret);
module.exports=(req, res, next)=>{

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token, app.get('superSecret'),(err, decoded)=>{
            if(err){
                console.log(err);
                return res.json({success:false, message:'Failded to authiencate token.'})
            }else{
                req.decoded=decoded;
                next();
            }
        });
    }else{
        return res.status(403).send({
            success:false,
            message:'No token provided'
        })
    }
}