import mongoose, {Schema} from "mongoose";

const counterSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default: 0
    }
})

const Counter = mongoose.model("Counter", counterSchema)
const orderSchema = new Schema({
    id: {
        type: String,
        unique: true,
        
    },
    customer_name: {
        type: String,
        required: true
    },

    product_name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending","shipped","cancelled","delivered","returned"],
        default: "pending"
    }
}, {timestamps: true})

orderSchema.pre("save", async function(next){
    if(!this.isNew) return next();
    try {
        const counter = await Counter.findByIdAndUpdate(
            {_id: "orderId"},
            {$inc: {seq: 1}},
            {new: true, upsert: true}
        )
        this.id = `ORD-${counter.seq}`;
        next()
    } catch (error) {
        next(error)
    }
})

export const Order = mongoose.model("Order", orderSchema)