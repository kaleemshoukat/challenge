const mongoose=require('mongoose')
const Schema=mongoose.Schema

const MovieSchema = new Schema({
    name: {
        type: String,
        max: 255,
        required: true
    },
    description: {
        type: String,
        max: 1000,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    genresIds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Package'
        }
    ],
    duration: {
        type: String,
        max: 255,
        required: true
    },
    rating: {
        type: Number,
        max: 5,
        min: 1,
        required: true
    },
},{
    timestamps: true
});

const Movie=mongoose.model('Movie', MovieSchema)
module.exports=Movie