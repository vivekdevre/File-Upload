const File = require("../Models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async(req, res) => {
    try {
        const file = req.files.file;
        console.log("File Aagyi idhar --->>", file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path--->", path);
        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success:true,
            message:"Local file uploaded successfully"
        });
    } catch (error) {
        console.log(error);
    }
};

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};

    if(quality){
        options.quality = quality;
    }
    
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);

}

//controller for image upload

exports.imageUpload = async (req, res) => {
    try {
        //data fetch karenge
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation karenge
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File type not supported!"
            });
        }

        const response = await uploadFileToCloudinary(file, "theGreatsVault");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        });

        return res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully!"
        });

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"Something went wrong!!"
        });
    }
};

//video upload ka handler

exports.videoUpload = async (req, res) => {
    try {
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        const supportedTypes = ["mp4", "mov", "mkv"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File type not supported!"
            });
        }

        const response = await uploadFileToCloudinary(file, "theGreatsVault");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url
        });

        return res.status(200).json({
            success:true,
            videoUrl:response.secure_url,
            message:"video uploaded successfully!"
        });

    } catch (error) {
        return console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong!!"
        });
    }
};

exports.imageSizeReducer = async (req, res) => {
    try {
        
        //data fetch karenge
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation karenge
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
/*************************************************************************************************** 
Dimag yaha lagaya hai!!!!
*/
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File type not supported!"
            });
        }

        const response = await uploadFileToCloudinary(file, "theGreatsVault", 30);
        console.log(response);
//*************************************************************************************************** */

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        });

        return res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully!"
        });

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"Something went wrong!!"
        });   
    }
};
