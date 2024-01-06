const Product = require("../models/product");

const createProduct = async (req, res) => {
    const body = req.body;

    try {
        const product = new Product(body);
        const result = await product.save();
        res.status(201).json({ message: "Created product!", result });
    } catch (err) {
        res.status(500).json({ message: "Internal server error!" });
    }
};

const getProduct=async(req,res)=>{
    
    try {
            const result=await Product.find({});
            res.status(200).json({message:"Fetching successful",data:result})
    } catch (err) {
        res.status(500).json({ message: "Internal server error!" });
    }
}
const getProductbyId=async(req,res)=>{
    
    try {   
            const id=req.params.id;
            const result=await Product.findById(id);
            res.status(200).json({message:"Fetching successful",data:result})
    } catch (err) {
        res.status(500).json({ message: "Internal server error!" });
    }
}
const updateProductbyId=async(req,res)=>{
    
    try {   
            const id=req.params.id;
            const body = req.body;
            const updateDoc={$set:{...body}};
            await Product.findByIdAndUpdate(id,updateDoc);
            updateDoc.updatedAt=Date.now();
            res.status(200).json({message:"Updating successful",data:updateDoc})
    } catch (err) {
        res.status(500).json({ message: "Internal server error!" });
    }
}

const deleteProductbyId=async(req,res)=>{
    
    try {   
            const id=req.params.id;
            await Product.findByIdAndDelete(id);
            res.status(200).json({message:"Deleting successful"})
    } catch (err) {
        res.status(500).json({ message: "Internal server error!" });
    }
}



module.exports = {
    createProduct,
    getProduct,
    getProductbyId,
    updateProductbyId,
    deleteProductbyId
};
