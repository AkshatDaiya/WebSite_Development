const Address = require('../Models/address');

exports.AddressPage = async (req, res) => {
    try {
        const record = await Address.findOne()
        const loginName = req.session.loginName
        res.render('admin/address.ejs', { loginName, record })
    } catch (error) {
        console.log(error.message);
    }

}

exports.AddressUpdate = async (req, res) => {
    try {
        const loginName = req.session.loginName
        const id = req.params.id
        const record = await Address.findById(id)
        res.render('admin/addressUpdate.ejs', { loginName, record })
    } catch (error) {
        console.log(error.message);
    }

}

exports.catchAddressUpdate = async (req, res) => {
    try {
        const { address, mobile, email, instaLink, fbLink } = req.body
        const id = req.params.id
        await Address.findByIdAndUpdate(id, { add: address, mobile: mobile, email: email, insta: instaLink, facebook: fbLink })
        res.redirect('/admin/address')
    } catch (error) {
        console.log(error.message);
    }

}