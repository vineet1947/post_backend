const exampleService = require("../services/exampleService");
const mongoose = require("mongoose");

const leaderboard = require("../models/LeaderboardModel");
const playerdatas = require("../models/PlayerDataModel");

exports.postResult = async (req, res) => {
    try {
        const product = await leaderboard.create(req.body);

        res.status(200).json({ success: true, code: 200, result: product });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

exports.getResultsSorted = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified

        const skip = (page - 1) * limit;
        const entries = await leaderboard
            .find({})
            .sort({ collected_eggs: -1, time_taken: 1 })
            .skip(skip)
            .limit(limit);

        // Count total number of leaderboard entries
        const totalCount = await leaderboard.countDocuments({});

        // Calculate total pages based on total count and limit
        const totalPages = Math.ceil(totalCount / limit);

        // Wrap the entries array with an object containing pagination metadata
        const leaderboardData = {
            result: entries,
            totalPages: totalPages,
            totalItems: totalCount,
            currentPage: page,
            itemsPerPage: limit,
        };

        res.status(200).json(leaderboardData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getResults = async (req, res) => {
    try {
        // Get query parameters for pagination
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified

        // Calculate the skip value based on the page and limit
        const skip = (page - 1) * limit;

        // Query leaderboard entries with pagination
        const products = await leaderboard.find({}).skip(skip).limit(limit);

        // Count total number of leaderboard entries
        const totalCount = await leaderboard.countDocuments({});

        // Calculate total pages based on total count and limit
        const totalPages = Math.ceil(totalCount / limit);

        // Wrap the entries array with an object containing pagination metadata
        const leaderboardData = {
            result: products,
            totalItems: totalCount,
            totalPages: totalPages,
            currentPage: page,
            itemsPerPage: limit,
        };

        res.status(200).json(leaderboardData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getItemsByPlayerId = async (req, res) => {
    try {
        const playerId = req.query.playerId; // Assuming player ID is passed as a route parameter
        console.log("playerId", playerId);

        // Query leaderboard entries with pagination
        const playerItems = await leaderboard.find({ player_id: playerId });
        console.log("playerItems from leader col", playerItems);

        const col = await playerdatas.find();
        console.log("playerItems from player col", col);

        if (playerItems.length) {
            const playerData = await playerdatas.find({ player_id: playerId });
            console.log("playerData from player col", playerData);

            if (playerData.length) {
                res.status(200).json({ result: playerData });
            } else {
                res.status(404).json({ message: "Player data not found" });
            }
        } else {
            res.status(404).json({ message: "Player not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.postPlayerResult = async (req, res) => {
    try {
        const product = await playerdatas.create(req.body);
        product.save();

        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
