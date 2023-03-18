const app = require('./src/app');

app.listen(3000, (err) => {
    if (err) throw new Error('error on running server');
    console.log('Server started on port 3000');
})
