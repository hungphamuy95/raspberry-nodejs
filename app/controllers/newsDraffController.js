const authiecation = require('./../common/jwtAuth')
const datetime = require('node-datetime')
const dt = datetime.create()
const formatted = dt.format('Y-m-d H:M:S')
const newsDraffModel = require('./../models/newsdraff')

module.exports = (app) => {
    app.post('/createnews', (req, res, next)=>{authiecation(req, res, next)}, (req, res) => {
        console.log(req.decoded);
        let createnewsdraff = new newsDraffModel({
            codenews: req.body.codenews,
            groupnews: req.body.groupnews,
            title: req.body.title,
            shortcontent: req.body.shortcontent,
            content: req.body.content,
            createuser: req.decoded.username,
            createdate: formatted,
            metatitle: convertVietnamese(req.body.title)
        })
        createnewsdraff.save((err) => {
            if(err) throw err;

            res.json({success: true});
        })
    })

    app.get('/getallnews', (req, res)=>{
        newsDraffModel.find({}, (err, newsresult) => {
            if(err) throw err;

            res.json({success: true, newsresult: newsresult});
        })
    });

    app.get('/getdetailnews/:id', (req, res)=>{
        newsDraffModel.findById(req.params.id, (err, detailres) => {
            if(err) throw err;
            res.json({success: true, detailres: detailres});
        })
    });

    app.put('/updatenews/:id,', (req, res, next) => {authiecation(req, res, next)}, (req, res)=>{
        newsDraffModel.findByIdAndUpdate(req.params.id,
        {$set:{
            codenews: req.body.codenews,
            groupnews: req.body.groupnews,
            title: req.body.title,
            shortcontent: req.body.shortcontent,
            content: req.body.content,
            updateuser: req.decoded.username,
            updatedate: formatted,
            metatitle: convertVietnamese(req.body.title)
        }},
        {new: true},
        (err, updateres) => {
            if(err) throw err;
            res.json({success: true, updateres: updateres});
        }
        )
    });

    app.delete('/deletenews/:id', (req, res, next) => authiecation(req, res, next), (req, res) => {
        newsDraffModel.findByIdAndRemove(req.params.id, (err, deleteres) => {
            if(err) throw err;
            res.json({success: true, deleteres: deleteres});
        })
    });
}

function convertVietnamese(input){
    var str = input;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ + /g," ");
    str = str.trim(); 
    return str.split(' ').join('-');
}