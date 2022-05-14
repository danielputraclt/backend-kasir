import mongoose from 'mongoose';

const Schema = mongoose.Schema({
    title:{
        type: String,
    },
    thumbnail:{
        type: String,
    },
    price:{
        type: Number,
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
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
});

Schema.virtual('categories', {
    ref: 'category',
    localField: 'category_id',
    foreignField: '_id'
})

export default mongoose.model('Product', Schema);