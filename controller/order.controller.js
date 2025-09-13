import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";

const addOrder = async (req, res) => {
    try {
        const { customer_name, product_name, status } = req.body
        if ([customer_name, product_name].some((field) => field?.trim() === "")) {
            throw new ApiError(401, "Customer Name and Product Name is Required")
        }
        const order = await Order.create({
            customer_name, product_name, status
        })
        return res.status(201).json(new ApiResponse(201, { order }, "Order Placed Successfully"))
    } catch (error) {
        throw new ApiError(500, "Error Occurred while Placing Order")
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 })
        return res.status(201).json(new ApiResponse(201, { orders }, "Order Fetched"))
    } catch (error) {
        throw new ApiError(500, "Error Occurred while Getting the Order")
    }
}

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ id: req.params.id })
        if (!order) {
            throw new ApiError(500, "No Order exist for this ID")
        }
        res.status(200).json(new ApiResponse(200, { order }, "Order Fetched"))
    } catch (error) {
        throw new ApiError(500, "Error Occurred while Getting Order for Particular Id")
    }
}

const updateOrderById = async (req, res) => {
    try {
        const { customer_name, product_name, status } = req.body
        const order = await Order.findOneAndUpdate(
            {
                id: req.params.id
            },
            {
                customer_name, product_name, status
            },
            {new: true}
        )
        if(!order){
            throw new ApiError(404, "Order Not found")
        }
        res.status(200).json(new ApiResponse(200, {order}, "Order Updated"))
    } catch (error) {
        throw new ApiError(200, "Error Occurred while Updating")
    }
}

const deleteOrderById = async(req, res)=>{
    try {
        const order = await Order.findOneAndDelete({id: req.params.id});
        if(!order){
            throw new ApiError(404, "Unable to find Order with Particular ID")
        }
        res.status(200).json(new ApiResponse(200, "Order Deleted Successfully"))
    } catch (error) {
        throw new ApiError(400, "SOmething went wrong while Deleting")
    }
}

export { addOrder, getOrders, getOrderById, updateOrderById, deleteOrderById }