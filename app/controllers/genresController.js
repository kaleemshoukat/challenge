const Genres = require('../models/Genres');
const apiResponse = require('../helpers/apiResponse');

exports.create= async (req, res) => {
    try{
        const body=req.body;
        const check=await Genres.findOne({name: body.name});
        if (check){
            return res.status(400).send(apiResponse.error('Genres name already exists.'));
        }

        const genres = await Genres.create({
            name: body.name,
            description: body.description
        });
        const data = {genres: genres};

        return res.status(200).send(apiResponse.success('Genres created successfully!', data));
    }
    catch (error) {
        return res.status(error.status || 400).send(apiResponse.error(error.message));
    }
}

exports.list=async (req, res)=> {
    try {
        const genres=await Genres.find({});
        const data = {genres: genres};

        return res.status(200).send(apiResponse.success('Success', data));
    }
    catch (error) {
        return res.status(error.status || 400).send(apiResponse.error(error.message));
    }
}

exports.delete= async (req, res) => {
    try{
        await Genres.findByIdAndDelete(req.params.id);

        return res.status(200).send(apiResponse.success('Genres deleted successfully!'));
    }
    catch (error) {
        return res.status(error.status || 400).send(apiResponse.error(error.message));
    }
}

exports.edit= async (req, res) => {
    try{
        const genres=await Genres.findById(req.params.id)
        const data = {genres: genres};

        return res.status(200).send(apiResponse.success('Success', data));
    }
    catch (error) {
        return res.status(error.status || 400).send(apiResponse.error(error.message));
    }
}

exports.update= async (req, res) => {
    try{
        const body = req.body;
        await Genres.findByIdAndUpdate(req.params.id, {
            name: body.name,
            description: body.description
        });

        return res.status(200).send(apiResponse.success('Genres updated successfully!'));
    }
    catch (error) {
        return res.status(error.status || 400).send(apiResponse.error(error.message));
    }
}

