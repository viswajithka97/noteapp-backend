const express = require('express')
const app = express()
const Product = require('./models/productModel')
const mongoose = require('mongoose')



app.use(express.json())

app.get('/', function (req, res) {
    res.send('Hello Node api running')
});


// get all products
app.get("/products", async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message);
        res.send(500).json({ message: error.message })
    }
})



// get product by id
app.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const id1 = req.params;
console.log(id);
console.log(id1);
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.send(500).json({ message: error.message })

    }
})

// add a product
app.post("/addProduct", async (req, res) => {

    try {
        const prodcut = await Product.create(req.body)
        res.status(200).json(prodcut)
    } catch (error) {
        console.log(error.message);
        res.send(500).json({ message: error.message })
    }

})

// update a product
app.put("/editProduct/:id", async (req, res) => {
    const { id } = req.params;
    console.log(req.body.name);
    const product = await Product.findByIdAndUpdate(id, req.body);
    const updatedProduct = await Product.findById(id);

    console.log(updatedProduct);
    if (!product) {
        return res.status(404).json({
            message: `Cannot find Product with ID ${id}`
        })
    }
    res.status(200).json(updatedProduct)
});


// delete product
app.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                message: `Cannot find Product with ID ${id}`

            })
        }
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message);
        res.send(500).json({ message: error.message })
    }
})


app.listen(
    3000, () => {
        console.log('Node API app is running on port 3000');
    }
);

// connect to database
mongoose.connect("mongodb+srv://admin:admin123@noteapp.p5ctbuc.mongodb.net/Node-API?retryWrites=true&w=majority").then(() => {
    console.log("Mongo DB connected");
}).catch((err) => {
    console.log("error " + err);
})
