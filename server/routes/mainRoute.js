import express from "express"

const router = express.Router()


// get
router.get('/', (req, res) => {
    console.log(req.body)
    const response = {
        ok: true,
        errMsg: 'Get method'
    }
    res.status(200).json(response).send()
})

// post
router.post('/', (req, res) => {
    console.log('Body: ', req.body)
    const response = {
        ok: true,
        errMsg: ''
    }
    res.status(200).json(response).send()
})

export default router