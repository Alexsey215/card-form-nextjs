const Router = require("express");
const CardData = require("../models/CardData")
const router = new Router()


router.post('/registration',
    async (req, res) => {
        try {
            console.log(req)
            const { cardNumber, expirationDate, cvv, amount } = req.body
            const candidate = await CardData.findOne({ cardNumber })
            if (candidate) {
                return res.status(400).json({ message: `CardData with cardNumber ${cardNumber} already exist` })
            }

            const card = new CardData({ cardNumber, expirationDate, cvv, amount })
            await card.save()
            res.json({ message: "CardData was created" })
        } catch (e) {
            console.log(e)
            res.send({ message: "Server error" })
        }
    })


router.post('/login',
    async (req, res) => {
        try {
            const { cardNumber } = req.body
            const card = await CardData.findOne({ cardNumber })
            if (!card) {
                return res.status(404).json({ message: "CardData not found" })
            }

            return res.json({
                token,
                card: {
                    id: card.id,
                    cardNumber: card.cardNumber,
                    expirationDate: card.expirationDate,
                    cvv: card.cvv,
                    amount: card.amount,
                    diskSpace: card.diskSpace,
                    usedSpace: card.usedSpace,
                    avatar: card.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({ message: "Server error" })
        }
    })


module.exports = router