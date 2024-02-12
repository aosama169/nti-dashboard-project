const mysql = require("mysql2");

const connection = mysql.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME
});

async function index() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM workcat", [], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function show(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM workcat WHERE id=?", [id], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function getProjects(id) {
    return new Promise((resolve, reject) => {
        connection.query("select workproj.id, workproj.title from workproj WHERE workproj.id NOT IN (SELECT workcatproj.projId FROM  workcatproj  where workcatproj.catId = ? ) ", [id], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function addProjects(cat, project) {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO workcatproj (catId, projId) VALUES (?,?)", [cat, project], (error, result) => {
            if(!error) {
                resolve(result);
            }else{
                reject(error);
            }
        })
    });
}

// async function destroy(id) {
//     return new Promise((resolve, reject) => {
//         connection.query("DELETE FROM workcat WHERE id=?", [id], (error, result) => {
//             if(error) {
//                 return res.json({ err: error});
//             }
//         })
//     });
// }

module.exports = {
    index,
    show,
    getProjects,
    addProjects
}