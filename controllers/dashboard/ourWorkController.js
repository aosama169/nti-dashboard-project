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
                ourWorkModel.getProjects(id).then(projects => {

                    res.render("dashboard/pages/ourWork/show", { oneMessage, projects });
                });
            }    
        );
}

const addProject = (req, res) => {
    const cat = req.params['cat'];
    const project = req.params['project'];

    ourWorkModel.addProjects(cat, project)
        .then(error => {
            
        });
    res.redirect("/dashboard/ourWork");
}



// const destroy = (req, res) => {
//     const id = req.params['id'];
//     ourWorkModel.destroy(id)
//         .then(error => {
//             //
//         });
//     res.redirect("/dashboard/ourWork");
// }

module.exports = {
    index,
    show,
    addProject
}