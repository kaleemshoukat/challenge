const mongoose=require('mongoose')
const Schema=mongoose.Schema

const GenresSchema = new Schema({
    name: {
        type: String,
        max: 255,
        required: true
    },
    description: {
        type: String,
        max: 1000,
        required: true
    }
},{
    timestamps: true
});

const Genres=mongoose.model('Genres', GenresSchema)
module.exports=Genres