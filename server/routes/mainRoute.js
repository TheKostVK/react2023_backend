import express from "express"

const router = express.Router()


router.get('/:id', (req, res) => {
    const response = {
        ok: true,
        errMsg: ''
    }
    res.status(200).json(response).send()
})


export default router