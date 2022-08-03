export function getDate(){
    var dt = new Date();
    var bulanArr = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sept", "Okt", "Nov", "Des"];
    var getTahun = dt.getFullYear();
    var getBulan = bulanArr[dt.getMonth()];
    var getTanggal = dt.getDate();
    var getJam = dt.getHours();
    var getMenit = dt.getMinutes();

    var date = `${getTanggal} ${getBulan} ${getTahun}, ${getJam}, ${getMenit}`;

    return date;

}