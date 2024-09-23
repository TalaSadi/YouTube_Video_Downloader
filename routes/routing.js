const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core')
const fs = require('fs')
const Video = require('./schema');



router.post('/', (req, res) => {
    req.body.status = 'pending';
    var newState = 'done'
    var x = 'talaLast.mp4';
    res.send({
        acknoldeged: true
    })
    Video.create(req.body).then(function (info) {
        console.log(req.body.status)

    })

    ytdl(req.body.link)
        .pipe(fs.createWriteStream(x)).end(() => {

            //Updated database
            const UrlID = req.body.link;


            Video.findOneAndUpdate({}, { status: 'done', path: x, link: UrlID }, { new: true }).then(function (t) { // we changed the schema!!

                console.log("File download is done")

            })


        })
})


router.get('/', (req, res) => {
    Video.find()
        .then(data => res.json(data))
        .catch(error => res.json(error))




});
module.exports = router;

// Video.find()
//     .then(data => res.json(data))
//     .catch(error => res.json(error))




// const counter = 0;


// Video.findByIdAndUpdate({}, {
//     path: newPath
// }).
//     then(function (task) {


//         const link = task[counter].link

//         var splitUrl = link.split('/');
//         const newPath = splitUrl[counter];

//         console.log(splitUrl[counter])
//         counter++;
//         res.send(task)
//     }).catch((e) => {
//         console.log(e)
//     })



// const url = req.body.url;
// console.log(url)
// for (const k in Video) {
//     console.log(k.url)
//     const _url = new URL(k.url);
//     const _path = _url.pathname;
//     console.log()
//     Video.updateOne({ _id: k._id }, { $set: { path: _path } }, { new: true }).then(function (task) {

//         res.end()
//     }
//     )
// }

// Video.find()
//     .then()
//     .catch(error => res.json(error))


//     for (const k in Video) {
//         const _url = 'https://youtu.be/XALBGkjkUPQ?si=9a_y-UJRGNxk-Xsq';
//         const _path = _url.pathname;
//         Video.updateOne({ _id: k._id }, { $set: { path: _path } }, { new: true }).then(function (task) {

//             res.end()
//         }
//         )


//     }







// router.post('/',function(req,res,next){
// ans=req.body;

// })

//let objFromStr;

// router.get('/', function (req, res, next) {

//     ytdl(ans)
//         .pipe(fs.createWriteStream('video1.mp4'));


//     // linkModel.create(ans).then(function (link) {
//     //     res.send(link)
//     // })
//     res.end();

// })


// router.get('/url', function (req, res, next) {
//     linkModel.find({}).then(function (links) {
//         res.json(links)
//     }).catch(function (err) {
//         console.log(err)
//     })
//     res.send(ans)
//     res.end();

// })
// Video.findByIdAndUpdate(link._id, { status: newState }.then(function (task) {
//     res.send(task)


// }).catch((e) => {
//     console.log(e)
// }), 