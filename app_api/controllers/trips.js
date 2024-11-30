const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //  Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome, repsonse must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

        // Uncomment the following line to show the results of query
        // on the console
        //console.log(q);
    
    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resukting trip list
        return res
            .status(200)
            .json(q)
    }

};

// GET: /trips - lists all the trips
// Regardless of outcome, repsonse must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode }) // Return single record
        .exec();

        // Uncomment the following line to show the results of query
        // on the console
        //console.log(q);
    
    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resukting trip list
        return res
            .status(200)
            .json(q)
    }

};

// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
    const newtrip = new Trip({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    });
  
    const q = await newtrip.save();
  
    if (!q) {
      //Database returned no data
      return res
            .status(400)
            .json(err);
    } else {
        return res
        .status(201)
        .json(q);
    }
    console.log(q);
  };

  // PUT: /trips/:tripCode - Adds a new Trip
  // Regardless of outcome, response must include HTML status code
  // and JSON message to the requesting client
  const tripsUpdateTrip = async(req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    const q = await Model
      .findOneAndUpdate(
        { 'code' : req.params.tripCode },
        {
            code: req.body.code, 
            name: req.body.name, 
            length: req.body.length, 
            start: req.body.start, 
            resort: req.body.resort, 
            perPerson: req.body.perPerson, 
            image: req.body.image, 
            description: req.body.description
        }
    )
    .exec();

    if(!q)
    { // Database returned no data
        return res
            .status(400)
            .json(err);
    } else { // Return resulting updated trip
        return res
            .status(201)
            .json(q);
    }

    // Uncomment the following line to show results of operation
    // on the console
     console.log(q);
  };

  const tripsDeleteTrip = async (req, res) => {
    // Uncomment for debugging
    // console.log(req.params);

    try {
        const deletedTrip = await Model.findOneAndDelete({ 'code': req.params.tripCode }).exec();

        if (!deletedTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        // Return the deleted trip
        return res.status(200).json(deletedTrip);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }

    // Uncomment the following line to show results of operation
    // on the console
    // console.log(deletedTrip);
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};