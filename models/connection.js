var mongoose = require('mongoose')

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect('mongodb+srv://Clem:Mongodb123@cluster0.phrpo.mongodb.net/mymovizapp?retryWrites=true&w=majority',
    options,
    function (err) {
        console.log(err);
    }
);

module.exports = mongoose