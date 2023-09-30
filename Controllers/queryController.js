const queryModel = require('../Models/query');
const nodemailer = require('nodemailer');


exports.userCatchFormValue = (req, res) => {
    try {
        const { queryFormEmail, queryFormText } = req.body
        const record = new queryModel({ email: queryFormEmail, query: queryFormText })
        record.save()
        console.log(record);
        res.redirect('/')
    } catch (error) {
        console.log(error.message);
    }

}

exports.query = async (req, res) => {
    try {
        const loginName = req.session.loginName
        const record = await queryModel.find().sort({ status: -1 })
        res.render('admin/query.ejs', { loginName, record })
    } catch (error) {
        console.log(error.message);
    }

}

exports.emailReplay = async (req, res) => {
    try {
        const loginName = req.session.loginName
        const id = req.params.id
        const record = await queryModel.findById(id)
        res.render('admin/emailReplay.ejs', { loginName, record })
    } catch (error) {
        console.log(error.message);
    }

}

exports.catchEmailReplayData = async (req, res) => {
    try {
        const id = req.params.id
        const { emailTo, emailForm, emailSub, emailBody } = req.body
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: 'santoshdaiya811@gmail.com',
                pass: 'rjqmmbmmxdzwlxdr'
            }
        });
        console.log("Connected to SMTP server");

        const info = await transporter.sendMail({
            from: emailForm, // sender address
            to: emailTo, // list of receivers
            subject: emailSub, // Subject line
            text: emailBody, // plain text body
            // html: "<b>Hello world?</b>", // html body
        });
        console.log("Email sent!");
        await queryModel.findByIdAndUpdate(id, { status: 'Replied' })
        res.redirect('/admin/query')
    } catch (error) {
        console.log(error.message);
    }
}

exports.deleteQuary = async (req, res) => {
    const id=req.params.id
    await queryModel.findByIdAndDelete(id)
    res.redirect('/admin/query')
}