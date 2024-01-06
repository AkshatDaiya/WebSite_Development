const serviceModal = require('../Models/service');

exports.servicePage = async (req, res) => {
    try {
        const loginName = req.session.loginName
        const record = await serviceModal.find().sort({ postedDate: -1 })
        const tService = await serviceModal.count()
        const tPublished = await serviceModal.count({ status: 'Published' })
        const tUnpublished = await serviceModal.count({ status: 'Unpublished' })
        res.render('admin/service.ejs', { loginName, record, tService, tPublished, tUnpublished })
    } catch (error) {
        console.log(error.message);
    }

}

exports.serviceForm = (req, res) => {
    try {
        const loginName = req.session.loginName
        res.render('admin/serviceForm.ejs', { loginName })
    } catch (error) {
        console.log(error.message);
    }

}

exports.fatchData = (req, res) => {
    try {
        let currDate = new Date()
        const fileName = req.file.filename
        const { title, details } = req.body
        const record = new serviceModal({ title: title, details: details, img: fileName, postedDate: currDate })
        record.save()
        // console.log(record);
        res.redirect('/admin/service')
    } catch (error) {
        console.log(error.message);
    }


}

exports.serviceDelete = async (req, res) => {
    try {
        const id = req.params.id
        await serviceModal.findByIdAndDelete(id)
        res.redirect('/admin/service')
    } catch (error) {
        console.log(error.message);
    }

}

exports.StatusUpdate = async (req, res) => {
    try {
        const id = req.params.id
        const record = await serviceModal.findById(id)
        let newStatus = null;

        if (record.status === 'Unpublished') {
            newStatus = 'Published'
        } else {
            newStatus = 'Unpublished'
        }
        await serviceModal.findByIdAndUpdate(id, { status: newStatus })
        res.redirect('/admin/service')
    } catch (error) {
        console.log(error.message);
    }

}

exports.fetchingStatus = async (req, res) => {
    try {
        const { SelectStatus } = req.body
        const record = await serviceModal.find({ status: SelectStatus })
        const loginName = req.session.loginName
        const tService = await serviceModal.count()
        const tPublished = await serviceModal.count({ status: 'Published' })
        const tUnpublished = await serviceModal.count({ status: 'Unpublished' })
        res.render('admin/service.ejs', { loginName, record, tService, tPublished, tUnpublished })
    } catch (error) {
        console.log(error.message);
    }

}


