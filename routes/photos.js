//photos.js
var express= require('express');
var router = express.Router();
var app = express();
var Photo = require('../models/photoModel');


router.get('/',(req, res, next)=>{

  Photo.find({})
    .then((photos)=>{
      res.render('photos', {
        photos : photos
      });
    })
    .catch((err)=>{
      if(err){
      res.end("Error");
      }

    });
});

//reading a specific post
router.get('/:photoid',(req,res,next)=>{
  console.log('finding'+req.params.photoid);
  Photo.findOne({'_id': req.params.photoid})
    .then((photo)=>{
      res.render('updatePhoto', {
        photo: photo,

      });
    }).catch((err)=>{
      if (err) console.log(err);
    });

});


//update a post
  router.post('/:photoid', (req,res,next)=>{

    Photo.findOne({'_id': req.params.photoid})
      .then((photo)=>{
        var data = {
          title: req.body.title,
          description: req.body.description,
          imageurl: req.body.imageurl
        }

        photo.set(data);
        photo.save()
          .then(()=>{
            res.redirect('/photos');
          });

      }).catch((err)=>{
        if (err) console.log(err);
    });

  });

//delete post
  router.get('photo._id'+'?delete=true', (req,res,next)=>{

    Photo.findOne({'_id': req.params.photoid})
    .then((photo)=>{
      res.render('deletePhoto', {
        photo: photo,
      });
      photo.remove();
      res.redirect('/photos');
    }).catch((err)=>{
      if (err) console.log(err);
    });
  });

//create a new post

  router.post('/', (req, res, next) =>{
    var path = req.body.imageurl;
    var photo = {
      title: req.body.title,
      description: req.body.description,
      imageurl: path
    }
    var photo = new Photo(photo);
    photo.save()
      .then(()=>{
        res.redirect('/photos');
      })
      .catch((err)=>{
        if((err)=>{
          console.log(err);
          throw new Error ("PhotoSaveError", photo);
        });
      });

  });

  module.exports = router;
