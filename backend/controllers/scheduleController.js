const asyncHandler = require('express-async-handler')

// @desc    Get Schedules
// @route   GET /api/schedules
// @access  Private
const getSchedules = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'get schedules'})
})



// @desc    Create Schedule
// @route   POST /api/schedules
// @access  Private
const createSchedule = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Lütfen bir değer girin')
    }
    res.status(200).json({ message: 'set schedule'})
})



// @desc    Update Schedule
// @route   PUT /api/schedules/:id
// @access  Private
const updateSchedule = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}`})
})



// @desc    Delete Schedule
// @route   DELETE /api/schedules/:id
// @access  Private
const deleteSchedule = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}`})
})



module.exports = {
    getSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
}