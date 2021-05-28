#  ( streamifier X multer X cloudinary X mongodb ) / nodejs

*   user can upload image to cloud from `/post` page.
*   uploading to cloud will happen first,
*   it will return **result** which will contain metadata of uploaded img
*   from that metadata, take `secure_url` & `public_id` and upload to mongoDB.
*   later, retrieve all imgages from cloudinary through **secure_url** stored in mongodb, by fetching it from there, ofc 😬



##  multer

*   In this example code, `multer` will take img/file from submitted from and validate using it's custom methods
*   multer will temprorily stored file as buffer in server memory

##  streamifier

*   this will convert buffer from hex values to cloudinary understandable format; 
    ```js
    streamifier.createReadStream(req.file.buffer).pipe(...)
    ```
*   then pipe result to cloudinary function to upload
*   see `/post` router in `app.js` for more details

##  cloudinary

*   cloudinary's `upload` will be piped by streamifier's **createStream** method, and then file will uploaded to cloud
*   you can additionally specify `folder` and `public_id` of file or other optional parameters, link to (doc)[https://cloudinary.com/documentation/image_upload_api_reference#upload_optional_parameters]
    ```js
    cloudinary.uploader.upload_stream( {
        folder: 'learning',
    },
    (error, result) => {
        //  result will have uploaded file's metadata
    }
    ```
*   see `/post` router in `app.js` for more details

