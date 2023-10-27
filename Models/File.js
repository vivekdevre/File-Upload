const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
});

//post middleware

fileSchema.post("save", async function(doc){
    try {
        console.log("DOC", doc);
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD
            }
        });

        //send mail
        let info = await transporter.sendMail({
            from:`TheGreat`,
            to:doc.email,
            subject:"New file uploaded on cloudinary",
            html:`<h1>Kaisa hai Bhai?</h1> <p><h3>K@lu mc!!</h3></p> <p><a href=${doc.imageUrl}>View Here!</a></p>`
        });

        console.log("INfO", info);


    } catch (error) {
        console.error(error);
    }
});


const File = mongoose.model("File", fileSchema);
module.exports = File;