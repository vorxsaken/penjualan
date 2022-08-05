import db from "@/plugins/firebase.js"

export function remove(target, id){
    const database = db.collection(target).doc(id);
    database.delete().then(() => {
        console.log("data deleted at " + target);
    }).catch((err) => {
        console.log(err);
    })
}