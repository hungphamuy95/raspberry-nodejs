const authiecation = require('./../common/jwtAuth')
const datetime = require('node-datetime')
const dt = datetime.create()
const formatted = dt.format('Y-m-d H:M:S')
const groupnews = require('./../models/groupnews')

module.exports = (app)=>{
    app.get('/groupnews',(req, res)=>{
        groupnews.find({}, (err, groupnewsesult)=>{
            if(err) throw err;
            res.json({success:true, groupnews: groupnewsesult});
        })
    });

    app.post('/creategroupnews', (req, res)=>{
        let creategropu = new groupnews({
            name: req.body.name,
            status: req.body.status,
            
        })
    })
}