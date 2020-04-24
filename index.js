const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();
const SpinDb = require('./model');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/spinapp';

//Connect to mongoDb
mongoose.connect(MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
)
.then( () => {
    console.log('Database Connected!')
})
.catch((err) => {
    console.log(err);
})

//Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
router.get('/', function(req, res, next) {
    res.render('view.ejs')
});

router.get('/checked', function(req, res, next) {
    const checked = await SpinDb.findOne({id: 100});
    if(!checked) return res.send(false);
    else return res.send(checked.checked);

});

router.post('/', async (req, res) => {

    const { data } = req.body;

    const checked = await SpinDb.findOne({id: 100});
    if(!checked){
        const spindb = new SpinDb({
            id: 100,
            checked: data
        });
    
        try{
            const result = await spindb.save();
            res.send(result);
        }catch(err){
            res.status(400).send(err);
        }
    }else{
        
        try{
            const result = await SpinDb.updateOne({id: 100}, {checked: data});
            res.send(result);

        }catch(err){
            res.status(400).send(err);
        }
    }
})

app.use('/', router);
//Create Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log('serve is running ' + JSON.stringify(PORT));
})