const RagTable = require('../Models/reg');

exports.admin_login_form = (req, res) => {
    try {
        res.render('admin/login.ejs', { message: '' })
    } catch (error) {
        console.log(error.message);
    }

}

exports.loginCheck = async (req, res) => {
    try {
        const { adminName, adminPass } = req.body
        const record = await RagTable.findOne({ name: adminName })
        if (record !== null) {
            if (record.pass === adminPass) {
                req.session.inAuth = true;
                req.session.loginName = adminName
                req.session.userid = record.id
                res.redirect('/admin/dashboard')
            } else {
                res.render('admin/login.ejs', { message: 'Wrong Credentials' })
            }
        } else {
            res.render('admin/login.ejs', { message: 'Wrong Credentials' })
        }
    } catch (error) {
        console.log(error.message);
    }

}

exports.dashboard = (req, res) => {
    try {
        const id = req.session.userid
        const loginName = req.session.loginName;
        res.render('admin/dashboard.ejs', { loginName, message: '' })
    } catch (error) {
        console.log(error.message);
    }

}

exports.passChange = async (req, res) => {
    try {
        const { nPassword } = req.body
        const loginName = req.session.loginName;
        const id = req.session.userid
        await RagTable.findByIdAndUpdate(id, {
            pass: nPassword
        })
        req.session.destroy()
        res.render('admin/PassChangeMsg.ejs')
    } catch (error) {
        console.log(error.message);
    }

    // res.render('admin/dashboard.ejs', { message: 'Password has been Changed Successfully', loginName })
}

exports.dashboard_logout = (req, res) => {
    try {
        req.session.destroy()
        res.redirect('/admin/')
    } catch (error) {
        console.log(error.message);
    }

}
