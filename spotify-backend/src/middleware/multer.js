import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
})

const upload = multer({ storage });
export default upload;

/*
Without Multer, your backend has a massive,
unusable chunk of mixed text and binary noise.
With Multer, you get two clean, ready-to-use JavaScript variables (req.body and req.file).

Splits the data into two tidy piles:

#Text fields are extracted and placed into req.body.

#Clean binary file data is extracted and placed into req.file.

*/