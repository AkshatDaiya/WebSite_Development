const adminRouter = require('express').Router();
const RegC = require('../Controllers/regController');
const BannerC = require('../Controllers/bannerController');
const ServiceC = require('../Controllers/serviceController');
const TestiC = require('../Controllers/testiController');
const QueryC = require('../Controllers/queryController');
const AddressC = require('../Controllers/addressController');
const upload = require('../Helpers/multer');
const validation = require('../Helpers/validation');


adminRouter.get('/', RegC.admin_login_form)

adminRouter.post('/', RegC.loginCheck)

adminRouter.get('/dashboard', validation, RegC.dashboard)

adminRouter.post('/dashboard',RegC.passChange)

adminRouter.get('/logout', RegC.dashboard_logout)

adminRouter.get('/banner', validation, BannerC.bannerPage)

adminRouter.get('/bannerUpdate/:id', validation, BannerC.BannerUpdateForm)

adminRouter.post('/bannerUpdate/:id', upload.single('Image'), BannerC.BannerUpdate)

adminRouter.get('/service', validation, ServiceC.servicePage)

adminRouter.post('/service', ServiceC.fetchingStatus)

adminRouter.get('/serviceForm', validation, ServiceC.serviceForm)

adminRouter.post('/serviceForm', upload.single('image'), ServiceC.fatchData)

adminRouter.get('/serviceDelete/:id', validation, ServiceC.serviceDelete)

adminRouter.get('/serviceStatusUpdate/:id', validation, ServiceC.StatusUpdate)

adminRouter.get('/testimonial', validation,TestiC.testimonial)

adminRouter.post('/testimonial',TestiC.formSelectByStatus)

adminRouter.get('/testiDelete/:id', validation,TestiC.tastiDelete)

adminRouter.get('/testiStatusUpdate/:id', validation,TestiC.testiStatusUpdate)

adminRouter.get('/query', validation,QueryC.query)

adminRouter.get('/emailReplay/:id', validation,QueryC.emailReplay)

adminRouter.post('/emailReplay/:id',QueryC.catchEmailReplayData)

adminRouter.get('/deleteQuary/:id',QueryC.deleteQuary)

adminRouter.get('/address', validation,AddressC.AddressPage)

adminRouter.get('/addressUpdate/:id', validation,AddressC.AddressUpdate)

adminRouter.post('/addressUpdate/:id',AddressC.catchAddressUpdate)

module.exports = adminRouter;