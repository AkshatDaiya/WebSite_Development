const BannerTable = require('../Models/userBanner');

exports.bannerPage = async (req, res) => {
    try {
        const loginName = req.session.loginName;
        const record = await BannerTable.findOne()
        // console.log(record);
        res.render('admin/banner.ejs', { loginName, record })
    } catch (error) {
        console.log(error.message);
    }

}

exports.BannerUpdateForm = async (req, res) => {
    try {
        const id = req.params.id
        const record = await BannerTable.findById(id)
        const loginName = req.session.loginName;
        res.render('admin/bannerUpdateForm.ejs', { loginName, record })
    } catch (error) {
        console.log(error.message);
    }

}

exports.BannerUpdate = async (req, res) => {
    try {
        const id = req.params.id
        const { Title, Details } = req.body
        if (req.file) {
            const fileName = req.file.filename
            await BannerTable.findByIdAndUpdate(id, { title: Title, datails: Details, image: fileName })
        } else {
            await BannerTable.findByIdAndUpdate(id, { title: Title, datails: Details })
        }
        res.redirect('/admin/banner')
    } catch (error) {
        console.log(error.message);
    }

}