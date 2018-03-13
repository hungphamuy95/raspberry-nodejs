const roles = require('./../models/roles')
const datetime = require('node-datetime')
const authiencation = require('./../common/jwtAuth')
const dt= datetime.create()
const formmated= dt.format('Y-m-d H:M:S')

module.exports = (app) => {
    app.post('/createrole',(req, res, next)=>{authiencation(req, res, next)}, (req, res)=>{
        let newRole = new roles({
            roleName: req.body.roleName,
            status: req.body.status,
            description: req.body.description,
            createAt: formmated
        });

        newRole.save((err)=>{
            if(err) throw err;
            console.log('save role');
            res.json({success: true});
        })
    });

    app.get('/getrolse', (req, res, next)=>{authiencation(req, res, next)}, (req, res)=>{
        roles.find((err, result)=>{
            if(err) throw err;
            res.json({success: true, roles: result});
        })
    });
}