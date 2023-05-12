const express = require("express")
const productTrendifyRouter = express.Router();
const {ProductTrendifyModel} = require("../Model/product.trendify.model");
const {auth} =require("../MiddleWare/logintrendify.middleware")


//adding the product by admin
productTrendifyRouter.post("/add",auth ,async (req, res) => {
  try {
    const medi =new ProductTrendifyModel(req.body);
    await medi.save();
    res.status(200).send("Successfully added Data");
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});
//get all products-

productTrendifyRouter.get('/', async (req, res) => {
  try {
    const products = await ProductTrendifyModel.find();
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});


//getting by category
productTrendifyRouter.get("/:category", async (req, res) => {
  let filters = { category: req.params.category }
  let {sort}=req.query
  let value = 0;
  
console.log(req.query)

  if (req.query.brand) {
    filters.brand = req.query.brand;
  }
  if (req.query.subcat2) {
    filters.subcat2 = req.query.subcat2;
  }
  if (req.query.tag) {
    filters.tag = req.query.tag;
  }
  if (req.query.name) {
    filters.name = { $regex: req.query.name, $options: "i" };
  }

  if (req.query.priceMinn) {
    let priceMin =  filters.price = { $gte: parseFloat(req.query.priceMinn) };
  }

  if (req.query.priceMaxx) {
    let priceMax =filters.price = { ...filters.price, $lte: parseFloat(req.query.priceMaxx) };
  }

  let { page } = req.query;
  let total = await ProductTrendifyModel.find(filters).count()
  let maxPage = total / 15;

  page = page > maxPage ? maxPage : page;
  if (page == 0 || page == undefined) page = 1;
  let realpage = (page - 1) * 1 || 0

  if (req.query.order == "asc") {
    value = 1
  } else if (req.query.order == "desc") {
    value = -1
  } else {
    value = 0;
  }
  
  try {
    let medi = await ProductTrendifyModel.find(filters).skip(realpage).sort({ [sort]: value }).limit(15);
   
    res.status(200).send({ products: medi,total });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});



//getting by subcategory
productTrendifyRouter.get("/:category/:subcategory", async (req, res) => {
  let filters = { category: req.params.category };

  if(req.params.subcategory){
    filters.subcategory = req.params.subcategory
  }
  let {sort}=req.query
  let value = 0;
  
console.log(req.query)

  if (req.query.brandrange) {
    filters.brand = req.query.brandrange;
  }
  if (req.query.subcat2) {
    filters.subcat2 = req.query.subcat2;
  }
  if (req.query.name) {
    filters.name = { $regex: req.query.name, $options: "i" };
  }

  if (req.query.priceMinn) {
    let priceMin =  filters.price = { $gte: parseFloat(req.query.priceMinn) };
  }

  if (req.query.priceMaxx) {
    let priceMax =filters.price = { ...filters.price, $lte: parseFloat(req.query.priceMaxx) };
  }

  let { page } = req.query;
  let total = await ProductTrendifyModel.find(filters).count()
  let maxPage = total / 3;

  page = page > maxPage ? maxPage : page;
  if (page == 0 || page == undefined) page = 1;
  let realpage = (page - 1) * 3;

  if (req.query.order == "asc") {
    value = 1
  } else if (req.query.order == "desc") {
    value = -1
  } else {
    value = 0;
  }
  
  try {
    let medi = await ProductTrendifyModel.find(filters).skip(realpage).sort({ [sort]: value }).limit(15);
   
    res.status(200).send({ products: medi,total });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});


//getting by subcategory
productTrendifyRouter.get("/:category/:subcategory/:subcat2", async (req, res) => {
  let filters = { category: req.params.category,subcat2:req.params.subcat2 };

  if(req.params.subcategory){
    filters.subcategory = req.params.subcategory
  }

  let {sort}=req.query
  let value = 0;
  
console.log(req.query)

  if (req.query.brandrange) {
    filters.brand = req.query.brandrange;
  }
  if (req.query.subcat2) {
    filters.subcat2 = req.query.subcat2;
  }
  if (req.query.name) {
    filters.name = { $regex: req.query.name, $options: "i" };
  }

  if (req.query.priceMinn) {
    let priceMin =  filters.price = { $gte: parseFloat(req.query.priceMinn) };
  }

  if (req.query.priceMaxx) {
    let priceMax =filters.price = { ...filters.price, $lte: parseFloat(req.query.priceMaxx) };
  }

  let { page } = req.query;
  let total = await ProductTrendifyModel.find(filters).count()
  let maxPage = total / 3;

  page = page > maxPage ? maxPage : page;
  if (page == 0 || page == undefined) page = 1;
  let realpage = (page - 1) * 3;

  if (req.query.order == "asc") {
    value = 1
  } else if (req.query.order == "desc") {
    value = -1
  } else {
    value = 0;
  }
  
  try {
    let medi = await ProductTrendifyModel.find(filters).skip(realpage).sort({ [sort]: value }).limit(15);
   
    res.status(200).send({ products: medi,total });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});




//get particular Products for logged-in user
productTrendifyRouter.get("/get/admin",auth ,async (req, res) => {
  try {
    const medi = await ProductTrendifyModel.find({ userId: req.body.userId });
    res.status(200).send({ products: medi });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

productTrendifyRouter.patch("/update/:id", auth,async (req, res) => {
  const { id } = req.params;
  const medi = await ProductTrendifyModel.find({ _id: id });
  try {
    if (req.body.medID !== medi.medID) {
      res.status("u are not that person");
    } else {
      const data = await ProductTrendifyModel.findByIdAndUpdate({ _id: id }, req.body);
      res.send("data has been updated");
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});


productTrendifyRouter.delete("/delete/:id", auth,async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ProductTrendifyModel.findByIdAndDelete({ _id: id });
    res.send("data has been Deleted");
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});


productTrendifyRouter.get("/:category/single/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const medi = await ProductTrendifyModel.findById({ _id: id });
    res.status(200).send({ product: medi });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});



productTrendifyRouter.get("/:category/:subcategory?/single/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const medi = await ProductTrendifyModel.findById({ _id: id });
    res.status(200).send({ product: medi });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = { productTrendifyRouter };