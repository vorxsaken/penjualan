import db from "@/plugins/firebaseInit.js"
import firebase from "firebase/app";
import "firebase/storage";

export function remove(target, id) {
    return new Promise((resolve, reject) => {
        const database = db.collection(target).doc(id);
        database.delete().then(() => {
            resolve("data deleted at " + target);
        }).catch((err) => {
            reject(err);
        })
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