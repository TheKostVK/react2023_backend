import express from "express";

const router = express.Router();

// GET request
router.get("/", (req, res) => {
    const response = {
        ok: true,
        errMsg: "GET method",
    };
    res.status(200).json(response);
});

// POST request
router.post("/", (req, res) => {
    const response = {
        ok: true,
        errMsg: "POST method",
    };
    res.status(200).json(response);
});

export default router;
