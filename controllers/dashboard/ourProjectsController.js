const ourProjectsModel = require("../../models/dashboard/ourProjectsModel");

const index = (req, res) => {
    ourProjectsModel.index()
        .then(messages => {
            res.render("dashboard/pages/ourProjects/index", { messages });
        });
}

const show = (req, res) => {
    const id = req.params['id'];
    ourProjectsModel.show(id)
        .then(oneMessage => {
                res.render("dashboard/pages/ourProjects/show", { oneMessage });
        });
}

const destroy = (req, res) => {
    const id = req.params['id'];
    ourProjectsModel.destroy(id)
        .then(error => {
            //
        });
    res.redirect("/dashboard/ourProjects");
}

module.exports = {
    index,
    show,
    destroy
}