import Freight from '../models/Freight.js';

export async function createFreight(req, res) {
  try {
    const { pickupLocation, destination, vanType, date, maxWeight, price } = req.body;

    // Validation - fushat e detyrueshme
    if (!pickupLocation || !destination || !vanType || !date || !maxWeight || !price) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Missing required fields',
        message: 'Pickup location, destination, van type, date, max weight, and price are required'
      }));
      return;
    }

    // Validation - vanType duhet të jetë një nga opsionet e sakta
    const validVanTypes = ['Dry Van', 'Reefer', 'Tarpauliner', 'Flatbed', 'Stepdeck', 'Lowboy', 'Tanker', 'Car Carrier'];
    if (!validVanTypes.includes(vanType)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Invalid van type',
        message: 'Van type must be one of: ' + validVanTypes.join(', ')
      }));
      return;
    }

    // userID merret nga req.user (nga authMiddleware)
    const freightData = {
      currentLocation: pickupLocation,
      destination: destination,
      truckType: vanType,
      dateAvailable: date,
      maxWeight: parseInt(maxWeight),
      price: parseInt(price),
      full: true,
      userID: req.user.userID
    };

    const freight = await Freight.create(freightData);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Freight posted successfully',
      freight
    }));

  } catch (error) {
    console.error('Create freight error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to create freight'
    }));
  }
}

export async function getUserFreights(req, res) {
  try {
    // userID merret nga req.user (nga authMiddleware)
    const freights = await Freight.findByUserId(req.user.userID);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      freights
    }));

  } catch (error) {
    console.error('Get user freights error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to get freights'
    }));
  }
}

export async function getAllFreights(req, res) {
  try {
    const freights = await Freight.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      freights
    }));

  } catch (error) {
    console.error('Get all freights error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to get freights'
    }));
  }
}

export async function updateFreight(req, res) {
  try {
    const { freightID } = req.params;
    const { pickupLocation, destination, vanType, date, maxWeight, price, full, booked } = req.body;

    // Gjej freight-in
    const freight = await Freight.findById(freightID);
    if (!freight) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Freight not found'
      }));
      return;
    }

    // Sigurohu që freight-i i takon user-it
    if (freight.userID !== req.user.userID) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Unauthorized',
        message: 'You can only update your own freights'
      }));
      return;
    }

    const freightData = {
      currentLocation: pickupLocation || freight.currentLocation,
      destination: destination || freight.destination,
      truckType: vanType || freight.truckType,
      dateAvailable: date || freight.dateAvailable,
      maxWeight: maxWeight || freight.maxWeight,
      price: price || freight.price,
      full: full !== undefined ? full : freight.full,
      booked: booked !== undefined ? booked : freight.booked
    };

    const updatedFreight = await Freight.update(freightID, freightData);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Freight updated successfully',
      freight: updatedFreight
    }));

  } catch (error) {
    console.error('Update freight error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to update freight'
    }));
  }
}

export async function deleteFreight(req, res) {
  try {
    const { freightID } = req.params;

    // Gjej freight-in
    const freight = await Freight.findById(freightID);
    if (!freight) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Freight not found'
      }));
      return;
    }

    // Sigurohu që freight-i i takon user-it
    if (freight.userID !== req.user.userID) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Unauthorized',
        message: 'You can only delete your own freights'
      }));
      return;
    }

    await Freight.delete(freightID);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Freight deleted successfully'
    }));

  } catch (error) {
    console.error('Delete freight error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to delete freight'
    }));
  }
}