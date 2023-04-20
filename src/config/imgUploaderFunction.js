const imgbbUploader = require("imgbb-uploader");

const imgUploaderFunction = async (url, res) => {
  const options = {
    apiKey: process.env.IMGBB_API_KEY,
    base64string: url,
  };
  imgbbUploader(options)
    .then((response) => {
      console.log(response);
      res.status(200).json({
        error: false,
        message: "Image uploaded successfully",
        link: response?.display_url,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        error: true,
        message: "Image upload failed",
      });
    });
};

module.exports = imgUploaderFunction;
