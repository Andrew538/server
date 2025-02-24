const examinationValidation = (req, res, next) => {
    console.log(req.body)
    if(req.body.client === '') {
        return res.json({message: "Заполните поле"})
    }
    if(req.body.client.length) {
        return next()
    }
    // next()
}

module.exports = examinationValidation