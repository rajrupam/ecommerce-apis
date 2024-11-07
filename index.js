const mongoose=require('mongoose');

const express=require('express');
const Uri= 'mongodb+srv://raj:ZQ27WgV3x3fl62wA@cluster0.s9nng.mongodb.net/'

const dbname= 'ecommerce_data';





//uri connection
mongoose.connect(Uri,{dbname:dbname})
.then(()=>{console.log('mongodb connected')})
.catch((err)=>console.log('err'))


//mongoose connected to database
mongoose.connection.on('connected',()=>{console.log('mongoose connected')});

mongoose.connection.on('error',()=>{console.log('error')});

mongoose.connection.on('disconnect',()=>{console.log('mongoose disconnected')});


//initializing express app
const app = express();

//initializing the server
app.listen(3000,()=>{
    console.log('App is running on port 3000')
})

//importing the product category model here
const ProductCategories= require('./productmodel');

const ShopCategories= require('./shopmodel');

const Signup=require('./signupmodel')

//parsing the data when being communicated from express srver with mongodb
const bodyparser= require('body-parser') ;

app.use(bodyparser.urlencoded({extended:false}));
app.use(express.json())

//adding a user to ecommerce

app.post('/user',(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;

    let newSignup= new Signup({
        email,
        password
    });

    newSignup.save().then((user)=>{
        res.send(user)
    }).catch((err)=>console.log(err))
})


app.get('/product-categories', async (req, res) => {
    try {
       const products = await ProductCategories.find();
    
    res.status(200).send({
        status:"success",
        results:products.length,
        data:{
            products
        }
    })
    } catch (err) {
       console.log('Error fetching products:', err);
       res.status(500).send('Server error');
    }
 });


 app.get('/shop-items', async (req, res) => {
    try {
       const shopItems = await ShopCategories.find();
    
    res.status(200).send({
        status:"success",
        results:shopItems.length,
        data:{
            shopItems
        }
    })
    } catch (err) {
       console.log('Error fetching products:', err);
       res.status(500).send('Server error');
    }
 });
 

//nodejs process to get exit
process.on('SIGINT',async ()=>{
   await mongoose.connection.close();
    process.exit(0);
})
