const { Schema, model, ObjectId } = require("mongoose")


const CardData = new Schema({
    cardNumber: { type: String, required: true, unique: true },
    expirationDate: { type: String, required: true },
    cvv: { type: String, required: true },
    amount: { type: String, required: true },
    diskSpace: { type: Number, default: 1024 ** 3 * 10 },
    usedSpace: { type: Number, default: 0 },
    avatar: { type: String },
    files: [{ type: ObjectId, ref: 'File' }]
})

module.exports = model('CardData', CardData)