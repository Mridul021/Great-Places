const fs = require("fs");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");
const User = require("../models/user");

const getPlaceById = async (req, res, next) => {
	console.log("GET Request in places");
	const placeId = req.params.pid;
	let place;
	try {
		place = await Place.findById(placeId);
	} catch (err) {
		// general error like missing info
		const error = new HttpError(
			"Something went wrong. Could not find a place.",
			500
		);
		return next(error);
	}

	if (!place) {
		// error where you cannot find an id
		const error = new HttpError(
			"Could not find a place for the provided id.",
			404
		);
		return next(error);
	}

	res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
	const userId = req.params.uid;
	console.log("uid");
	let places;
	try {
		places = await Place.find({ creator: userId });
	} catch (err) {
		const error = new HttpError(
			"Fetching places failed, please try again later",
			500
		);
		return next(error);
	}

	if (!places || places.length === 0) {
		return next(
			new HttpError("Could not find  places for the provided user id.", 404)
		);
	}

	res.json({
		places: places.map((place) => place.toObject({ getters: true })),
	});
};

const createPlace = async (req, res, next) => {
	//async
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(1);
		// console.log(errors);
		return next(
			new HttpError("Invalid inputs passed. Please check your data", 422)
		);
	}
	const { title, description, address, creator } = req.body;
	let coordinates;
	try {
		coordinates = getCoordsForAddress(address); //await
	} catch (error) {
		return next(error);
	}

	const createdPlace = new Place({
		title,
		description,
		address,
		location: coordinates,
		image: req.file.path,
		// "https://www.history.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_686/MTU3ODc4NjA0ODYzOTA3NTUx/image-placeholder-title.webp",
		creator: req.userData.userId,
	});

	let user;
	try {
		user = await User.findById(req.userData.userId);
	} catch (err) {
		console.log("User find failed");
		const error = new HttpError(
			"Creating place failed, please try again.",
			500
		);
		return next(error);
	}

	if (!user) {
		const error = new HttpError("Could not find user for provided id.", 404);
		return next(error);
	}
	console.log(user);

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createdPlace.save({ session: sess });
		console.log("check 1");
		user.places.push(createdPlace); // only adds places id behind the scenes...not a normal push
		console.log("check 2");
		await user.save({ session: sess });
		console.log("check 3");
		await sess.commitTransaction();
	} catch (err) {
		console.log("Place add failed");
		console.log(err);
		const error = new HttpError("Creating place failed, please try again", 500);
		return next(error);
	}

	res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed. Please check your data", 422)
		);
	}

	const { title, description } = req.body;
	const placeId = req.params.pid;

	let place;
	try {
		place = await Place.findById(placeId);
	} catch (err) {
		// general error like missing info
		const error = new HttpError(
			"Something went wrong. Could not update place.",
			500
		);
		return next(error);
	}

	if (place.creator.toString() !== req.userData.userId) {
		const error = new HttpError("You are not allowed to edit this place.", 401);
		return next(error);
	}

	place.title = title;
	place.description = description;

	try {
		await place.save();
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not update place",
			500
		);
		return next(error);
	}

	res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
	const placeId = req.params.pid;

	let place;
	try {
		place = await Place.findById(placeId).populate("creator");
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not delete place.",
			500
		);
		return next(error);
	}
	if (!place) {
		const error = new HttpError("Could not find place for this id.", 404);
		return next(error);
	}
	if (place.creator.id !== req.userData.userId) {
		const error = new HttpError(
			"You are not allowed to delete this place.",
			401
		);
		return next(error);
	}
	const imagePath = place.image;
	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await place.remove({ session: sess });
		place.creator.places.pull(place);
		await place.creator.save({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not delete place.",
			500
		);
		return next(error);
	}
	fs.unlink(imagePath, (err) => {
		console.log(err);
	});
	res.status(200).json({ message: "Deleted place" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
