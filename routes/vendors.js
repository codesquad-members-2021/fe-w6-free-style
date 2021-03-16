import express from "express";
import path from "path";

const __dirname = path.resolve();
const router = express.Router();

router.use('/bootstrap', express.static(path.join(__dirname,"/node_modules/bootstrap/dist")));
router.use('/jquery', express.static(path.join(__dirname,"/node_modules/jquery/dist")));

export default router;