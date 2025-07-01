const express = require("express");
const Property = require("../models/Property");
const authMiddleware = require("../middleware/authmiddleware");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, location } = req.body;

        const existingProperty = await Property.findOne({ title, location, userId: req.user.id });
        if (existingProperty) {
            return res.status(400).json({ error: "Property already exists" });
        }

        const newProperty = new Property({
            ...req.body,
            userId: req.user.id
        });
        await newProperty.save();
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(500).json({ error: "Failed to add property" });
    }
});

router.get("/", async (req, res) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;

        const query = search
            ? { $or: [{ title: new RegExp(search, "i") }, { location: new RegExp(search, "i") }] }
            : {};

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const properties = await Property.find(query).skip(skip).limit(parseInt(limit));

        const total = await Property.countDocuments(query);

        res.status(200).json({
            properties,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch properties" });
    }
});

router.get("/properties", async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const properties = await Property.find()
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Property.countDocuments();

        if (page > Math.ceil(total / limit)) {
            return res.status(400).json({ error: "Page out of range" });
        }

        res.status(200).json({
            properties,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch properties" });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const property = await Property.findOneAndDelete({ 
            _id: req.params.id, 
        });

        if (!property) {
            return res.status(404).json({ error: "Property not found or unauthorized" });
        }

        res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete property" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const updatedProperty = await Property.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );

        if (!updatedProperty) {
            return res.status(404).json({ error: "Property not found or unauthorized" });
        }

        res.status(200).json(updatedProperty);
    } catch (error) {
        res.status(500).json({ error: "Failed to update property" });
    }
});

module.exports = router;
