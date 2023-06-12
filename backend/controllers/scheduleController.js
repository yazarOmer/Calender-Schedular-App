const asyncHandler = require('express-async-handler')

const Schedule = require('../models/scheduleModel')
const User = require('../models/userModel')

// @desc    Get Schedules
// @route   GET /api/schedules
// @access  Private
const getSchedules = asyncHandler(async (req, res) => {
    const schedules = await Schedule.find({ user: req.user.id })

    res.status(200).json(schedules)
})



// @desc    Create Schedule
// @route   POST /api/schedules
// @access  Private
const createSchedule = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Lütfen bir değer girin')
    }

    const schedule = await Schedule.create({
        text: req.body.text,
        day: req.body.day,
        startHour: req.body.startHour,
        endHour: req.body.endHour,
        user: req.user.id
    })
    res.status(200).json(schedule)
})



// @desc    Update Schedule
// @route   PUT /api/schedules/:id
// @access  Private
const updateSchedule = asyncHandler(async (req, res) => {

    const schedule = await Schedule.findById(req.params.id)

    if(!schedule) {
        res.status(400)
        throw new Error('Schedule bulunamadı')
    }

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('Kullanıcı bulunamadı')
    }

    if(schedule.user.toString() !== user.id) {
        res.status(401)
        throw new Error('Kullanıcı girişi yapılmadı')
    }

    const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true, })

    res.status(200).json(updatedSchedule)
})



// @desc    Delete Schedule
// @route   DELETE /api/schedules/:id
// @access  Private
const deleteSchedule = asyncHandler(async (req, res) => {

    const schedule = await Schedule.findById(req.params.id)

    if(!schedule) {
        res.status(400)
        throw new Error('Schedule bulunamadı')
    }

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('Kullanıcı bulunamadı')
    }

    if(schedule.user.toString() !== user.id) {
        res.status(401)
        throw new Error('Kullanıcı girişi yapılmadı')
    }

    await Schedule.findByIdAndDelete(req.params.id)
    //await schedule.remove()

    res.status(200).json({ id: req.params.id })
})



module.exports = {
    getSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
}