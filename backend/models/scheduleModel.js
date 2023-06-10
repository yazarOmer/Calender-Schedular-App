const mongoose = require('mongoose')

const scheduleSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Lütfen bir değer girin']
    },
    day: {
        type: String,
    },
    startHour: {
        type: String,
        required: [true, 'Lütfen başlangıç tarihi girin']
    },
    endHour: {
        type: String,
        required: [true, 'Lütfen bitiş tarihi girin']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Schedule', scheduleSchema)