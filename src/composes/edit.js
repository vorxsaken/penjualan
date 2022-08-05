import db from "@/plugins/firebaseInit.js";
import firebase from "firebase/app";
import "firebase/storage";

export function changeAt(target, id, data) {
    return new Promise((Resolve, Reject) => {
        const database = db.collection(target).doc(id);
        database.update(data).then(() => {
            Resolve(`data changet at ${target} with id ${id}`);
        }).catch((err) => {
            Reject(err);
        })
    })
}

export async function updateWithAFile(id, target, targetFiles, data, files, callbackPath) {
    return new Promise((myResolve, myReject) => {
        const database = db.collection(target).doc(id);
        const storageRef = firebase.storage().ref();
        const docRef = storageRef.child(targetFiles);
        docRef.put(files).on(
            "state_changed",
            () => { },
            (err) => { console.log(err) },
            () => {
                database.update(data).then(async () => {
                    const fileURL = await docRef.getDownloadURL();
                    database.update({
                        [callbackPath]: fileURL
                    }).then(async () => {
                        const fileUrl = await docRef.getDownloadURL() 
                        myResolve(fileUrl);
                    }).catch((err) => {
                        myReject(err);
                    });
                }).catch((err) => { console.log(err) })
            }
        )
    })
}