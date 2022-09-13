import db from "@/plugins/firebaseInit.js"
import firebase from "firebase/app";
import "firebase/storage";

export function remove(target, id) {
    const database = db.collection(target).doc(id);
    database.delete().then(() => {
        console.log("data deleted at " + target);
    }).catch((err) => {
        console.log(err);
    })
}

export function deleteFileFromStorageWithUrl(url) {
    return new Promise((resolve, reject) => {
        const storageRef = firebase.storage().refFromURL(url);
        storageRef.delete().then(() => {
            resolve('berhasil menghapus file')
        }).catch((err) => {
            reject(err)
        })
    })
}