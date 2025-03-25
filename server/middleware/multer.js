import multer from "multer";

// Configure multer to store files temporarily in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;