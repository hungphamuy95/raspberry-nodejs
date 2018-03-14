const jwt = require('jsonwebtoken');
const User = require('./../models/users');
const datetime = require('node-datetime');
const md5hash = require('./../common/crypto');
const config = require('./../../config');
const athiencation = require('./../common/jwtAuth');

const dt= datetime.create();
const formmated= dt.format('Y-m-d H:M:S');
module.exports = (app, app2)=>{
    app.post('/setupuser', (req, res)=>{
        let nick = new User({
            name: req.body.name,
            password: md5hash(req.body.password),
            payload: true,
            createAt: formmated,
            status: true
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
                res.json({success:false, message: 'Người dùng không tồn tại'});
            }else if(user){
                if(user.password != md5hash(req.body.password)){
                    res.json({
                        success: false, message: 'Sai mật khẩu'
                    });
                }else{
                    const _payload = {
                        payload: user.payload,
                        username:user.name
                    };
                    console.log(_payload);
                    const token = jwt.sign(_payload, app2.get('superSecret'), {expiresIn:"1h"});
                    res.json({
                        success:true, message: token
                    })
                }
            }
        })
    });

    app.get('/', (req, res)=>{
        res.send('Hello ExpressJS!');
    });

    app.get('/users', (req, res, next)=>{athiencation(req, res, next)}, (req, res)=>{
        User.find({}, (err, user)=>{
            if(err) throw err;
            res.json(user);
        });
    });

    app.get('/user/:id', (req, res, next)=>{athiencation(req, res, next)}, (req, res)=>{
        User.findById(req.params.id,(err, userdetail)=>{
            if(err) throw err;
            res.json(userdetail);
        });
    });

    app.put('/updateuser/:id', (req, res, next)=>{athiencation(req, res, next)}, (req,res)=>{
        User.findByIdAndUpdate(req.params.id, {$set:{
            name: req.body.name,
            password: md5hash(req.body.password),
            updateAt: formmated
        }},{new:true},
    (err, useresult)=>{
        if(err) throw err;
        res.json(useresult);
    }
    );
    });
}