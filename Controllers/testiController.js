const testiModul = require('../Models/testiModel');

exports.testimonial = async (req, res) => {
    try {
        const loginName = req.session.loginName
        const record = await testiModul.find().sort({ postedDate: -1 })
        const testiCount = await testiModul.count()
        const testiPubCount = await testiModul.count({ status: 'Published' })
        const testiUnpubCount = await testiModul.count({ status: 'Unpublished' })
        res.render('admin/testimonial.ejs', { loginName, record, testiCount, testiPubCount, testiUnpubCount })
    } catch (error) {
        console.log(error.message);
    }

}

exports.formSelectByStatus = async (req, res) => {
    try {
        const { search } = req.body
        const record = await testiModul.find({ status: search })
        const loginName = req.session.loginName
        const testiCount = await testiModul.count()
        const testiPubCount = await testiModul.count({ status: 'Published' })
        const testiUnpubCount = await testiModul.count({ status: 'Unpublished' })
        res.render('admin/testimonial.ejs', { loginName, record, testiCount, testiPubCount, testiUnpubCount })
    } catch (error) {
        console.log(error.message);
    }

}

exports.tastiDelete = async (req, res) => {
    try {
        const id = req.params.id
        await testiModul.findByIdAndDelete(id)
        res.redirect('/admin/testimonial')
    } catch (error) {
        console.log(error.message);
    }

}

exports.testiStatusUpdate = async (req, res) => {
    try {
        const id = req.params.id
        const record = await testiModul.findById(id)
        console.log(record);
        let newStatus = null
        if (record.status === 'Unpublished') {
            newStatus = 'Published'
        } else {
            newStatus = 'Unpublished'
        }

        await testiModul.findByIdAndUpdate(id, { status: newStatus })
        res.redirect('/admin/testimonial')
    } catch (error) {
        console.log(error.message);
    }

}

exports.userTestiUploadForm = (req, res) => {
    try {
        res.render('userTestiFrom.ejs',)
    } catch (error) {
        console.log(error.message);
    }

}

exports.userTestiImgUpload = (req, res) => {
    try {
        let currDate = new Date()
        const { name, details } = req.body
        if (req.file) {
            const fileName = req.file.filename
            var record = new testiModul({ name: name, img: fileName, details: details, postedDate: currDate })
        } else {
            const fileName = 'default.png'
            var record = new testiModul({ name: name, img: fileName, details: details, postedDate: currDate })
        }
        record.save()
        res.redirect('/')
    } catch (error) {
        console.log(error.message);
    }

}
