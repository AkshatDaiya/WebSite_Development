const userRouter = require('express').Router();
const bannerModel = require('../Models/userBanner');
const serviceModel = require('../Models/service');
const testiModul = require('../Models/testiModel');
const TestiC = require('../Controllers/testiController');
const QueryC = require('../Controllers/queryController');
const Address = require('../Models/address');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

let upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 4 }
})

userRouter.get('/', async (req, res) => {
    const bannerRecord = await bannerModel.findOne()
    const serviceRecord = await serviceModel.find({ status: 'Published' }).sort({ postedDate: -1 })
    const testiRecord = await testiModul.find({ status: 'Published' })
    const addressRecord = await Address.findOne()
    res.render('index.ejs', { bannerRecord, serviceRecord, testiRecord, addressRecord })
})

userRouter.get('/userTesti', TestiC.userTestiUploadForm)

userRouter.post('/userTesti', upload.single('img'), TestiC.userTestiImgUpload)

userRouter.post('/', QueryC.userCatchFormValue)


module.exports = userRouter;