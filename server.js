const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/parking-project-angular'));
app.get('/*', function (req, res) {
    console.log(__dirname + '/dist/parking-project-angular/index.html');
    res.sendFile(path.join(__dirname +
        '/dist/parking-project-angular/index.html'));
});
app.listen(process.env.PORT || 8080);