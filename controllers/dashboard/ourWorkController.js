const ourWorkModel = require("../../models/dashboard/ourWorkModel");

const index = (req, res) => {
    ourWorkModel.index()
        .then(messages => {
            res.render("dashboard/pages/ourWork/index", { messages });
        });
}

const show = (req, res) => {
    const id = req.params['id'];
    ourWorkModel.show(id)
        .then(oneMessage => {
            ourWorkModel.markAsRead(id)
                    .then(err => {
                        //
                    });
                    res.render("dashboard/pages/ourWork/show", { oneMessage });
        });
}

const destroy = (req, res) => {
    const id = req.params['id'];
    ourWorkModel.destroy(id)
        .then(error => {
            //
        });
    res.redirect("/dashboard/ourWork");
}

module.exports = {
    index,
    show,
    destroy
}