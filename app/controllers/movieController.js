const Movie = require('../models/Movie');
const apiResponse = require('../helpers/apiResponse');

exports.create= async (req, res) => {
    try{
        const body=req.body;
        const check=await Movie.findOne({name: body.name});
        if (check){
            return res.status(400).send(apiResponse.error('Movie name already exists.'));
        }

        const movie = await Movie.create({
            name: body.name,
            description: body.description,
            releaseDate: body.releaseDate,
            genresIds: body.genresIds,
            duration: body.duration,
            rating: body.rating
        });
        const data = {movie: movie};

        return res.status(200).send(apiResponse.success('Movie created successfully!', data));
    }
    catch (error) {
        return res.status(error.status || 400).send(apiResponse.error(error.message));
    }
}

exports.list=async (req, res)=> {
    try {
        const movie=await Movie.find({});
        const data = {movie: movie};

        return res.status(200).send(apiResponse.success('Success', data));
    }
    catch (error) {
        return res.status(error.status || 400).send(apiResponse.error(error.message));
    }
}

exports.delete= async (req, res) => {
    try{
        await Movie.findByIdAndDelete(req.params.id);

        return res.status(200).send(apiResponse.success('Movie deleted successfully!'));
    }
    catch (error) {
        return res.status(error.status || 400).send(apiResponse.error(error.message));
    }
}

exports.edit= async (req, res) => {
    try{
        const movie=await Movie.findById(req.params.id)
        const data = {movie: movie};

        return res.status(200).send(apiResponse.success('Success', data));
    }
    catch (error) {
        return res.status(error.status || 400).send(apiResponse.error(error.message));
    }
}

exports.update= async (req, res) => {
    try{
        const body = req.body;
        await Movie.findByIdAndUpdate(req.params.id, {
            name: body.name,
            description: body.description,
            releaseDate: body.releaseDate,
            genresIds: body.genresIds,
            duration: body.duration,
            rating: body.rating
        });

        return res.status(200).send(apiResponse.success('Movie updated successfully!'));
    }
    catch (error) {
        return res.status(error.status || 400).send(apiResponse.error(error.message));
    }
}

