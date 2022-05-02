import mongoose from 'mongoose'

const Schema = mongoose.Schema({
    title:{
        type: String,
    },
    status:{
        type: String,
        enum: ['actve', 'inactive'],
        default: 'active',
    },
    createdAt:{
        type: Number,
    },
    updatedAt:{
        type:Number,
    }
},
{
    timestamps: {currentTime: () => Math.floor(Date.now()/1000)}
})
