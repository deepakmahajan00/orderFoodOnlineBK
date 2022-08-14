const Resturant = require('../models/Resturant');

const getResturantByOpenTiming = async (req, res, next) => {
    try {
        let businessHours = req.query.businessTiming;
        let businessOpeningDetails = businessHours.split(",");
        
        day = businessOpeningDetails[0].trim();
        
        timings = businessOpeningDetails[1].split("-");
        openTime = timings[0].trim();
        closeTime = timings[1].trim();

        let [resturant, _] = await Resturant.findByDayOpenAndCloseTime(day, openTime, closeTime);
        let totalRecords = Object.keys(resturant).length;
        res.status(200).json({'total_records': totalRecords, resturant});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    getResturantByOpenTiming,
}

