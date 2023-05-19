require('dotenv').config();
const express = require('express');
const corcs = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
app.get('/api/kullanıcılar', (req, res) => {
    res.json(users);
});

app.post('/api/kayıtol', (req, res) => {
    const {kullaniciadi, sifre } = req.body;

    const newUser = {
        kullaniciadi,
        sifre
    };

    users.push(newUser);
    res.json(newUser);
});


app.post('/api/giriş', (req, res) => {
    const {kullaniciadi, sifre} = req.body;

    const user = users.find(user => user.kullaniciadi === kullaniciadi && user.sifre === sifre);

    if (user) {
        res.json({message: 'Hoşgeldiniz!'});

    } else {
        res.status(401).json({message: 'Geçersiz kullanıcı'});
    }
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is running on port ${port}');
});