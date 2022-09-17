export function getDate(){
    var dt = new Date();
    var bulanArr = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sept", "Okt", "Nov", "Des"];
    var getTahun = dt.getFullYear();
    var getBulan = bulanArr[dt.getMonth()];
    var getTanggal = dt.getDate();
    var getJam = dt.getHours().toString().length < 2 ? "0" + dt.getHours().toString() : dt.getHours().toString();
    var getMenit = dt.getMinutes().toString().length < 2 ? "0" + dt.getMinutes().toString() : dt.getMinutes().toString();
    var getSecond = dt.getSeconds().toString().length < 2 ? "0" + dt.getSeconds().toString() : dt.getSeconds().toString();

    var date = `${getTanggal} ${getBulan} ${getTahun}, ${getJam}.${getMenit}.${getSecond}`;

    return date;

}

export function compressImage(image, scale, initialWidth, initialHeight){
    return new Promise((resolve, reject) => {
        var img = new Image();
        img.src = image;

        const canvas = document.createElement("canvas");

        canvas.width = scale * initialWidth;
        canvas.height = scale * initialHeight;
        const ctx = canvas.getContext("2d");
        
        if(image == null) {
            return reject("no image input");
        }

        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            ctx.canvas.toBlob((blob) => {
                resolve(blob)
            }, "image/png");
        }
    })
}