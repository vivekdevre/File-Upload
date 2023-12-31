const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

const db = require("./Config/database");
db.connect();

const cloudinary = require("./Config/cloudinary");
cloudinary.cloudinaryConnect();

const Upload = require("./Routes/FileUpload");
app.use('/api/v1/upload', Upload);

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
}); 