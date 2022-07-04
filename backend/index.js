import express from 'express';
import cors from 'cors';
import request from 'request';
const app = express();
const port = 3000;

app.use(cors());

app.get('/getCost/:dari/:ke/:berat/:kurir', async (req, res) => {
    var options = {
        method: 'POST',
        url: 'https://api.rajaongkir.com/starter/cost',
        headers: { key: 'e40580853e09b3502ee78eb08caaa635', 'content-type': 'application/x-www-form-urlencoded' },
        form: { origin: req.params.dari, destination: req.params.ke, weight: req.params.berat, courier: req.params.kurir }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.send(body);
    });

});
app.get('/getKota/:provinsi', (req, res) => {
    var options = {
        method: 'GET',
        url: 'https://api.rajaongkir.com/starter/city',
        qs: { id: '', province: req.params.provinsi },
        headers: { key: 'e40580853e09b3502ee78eb08caaa635' }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.send(body);
    });
})

app.get('/getProvinsi', (req, res) => {
    var options = {
        method: 'GET',
        url: 'https://api.rajaongkir.com/starter/province',
        qs: { id: '' },
        headers: { key: 'e40580853e09b3502ee78eb08caaa635' }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.send(body)
    });
})

app.listen(port, () => {
    console.log(`listenin app at port: ${port}`);
});