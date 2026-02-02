import Truck from '../models/Truck.js';

export async function createTruck(req, res) {
  try {
    const { currentLocation, truckType, dateAvailable, maxWeight, vanLength, width } = req.body;

    // Validation - fushat e detyrueshme
    if (!currentLocation || !truckType || !dateAvailable || !maxWeight) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Missing required fields',
        message: 'Current location, truck type, date available, and max weight are required'
      }));
      return;
    }

    // Validation - truckType duhet të jetë një nga opsionet e sakta
    const validTruckTypes = ['Dry Van', 'Reefer', 'Tarpauliner', 'Flatbed', 'Stepdeck', 'Lowboy', 'Tanker', 'Car Carrier'];
    if (!validTruckTypes.includes(truckType)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Invalid truck type',
        message: 'Truck type must be one of: ' + validTruckTypes.join(', ')
      }));
      return;
    }

    // userID merret nga req.user (nga authMiddleware)
    const truckData = {
      currentLocation,
      truckType,
      dateAvailable,
      maxWeight,
      vanLength: vanLength || null,
      width: width || null,
      userID: req.user.userID
    };

    const truck = await Truck.create(truckData);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Truck posted successfully',
      truck
    }));

  } catch (error) {
    console.error('Create truck error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to create truck'
    }));
  }
}

export async function countTrucks(req,res){
  try{
    const total = await Truck.countTrucks();
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({
      total:total
    }))
    return;
  }catch(err){
    console.log('Error:', err);
    res.writeHead(500,{'Content-Type' : 'application/json'})
    res.end(JSON.stringify({
      error:'Unexpected Error',
      message:'Failed to count trucks'
    }));
  }
}

export async function getUserTrucks(req, res) {
  try {
    // userID merret nga req.user (nga authMiddleware)
    const trucks = await Truck.findByUserId(req.user.userID);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      trucks
    }));

  } catch (error) {
    console.error('Get user trucks error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to get trucks'
    }));
  }
}

export async function getAllTrucks(req, res) {
  try {
    const trucks = await Truck.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      trucks
    }));

  } catch (error) {
    console.error('Get all trucks error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to get trucks'
    }));
  }
}

export async function updateTruck(req, res) {
  try {
    const { truckID } = req.params;
    const { currentLocation, truckType, dateAvailable, maxWeight, vanLength, width, booked } = req.body;

    // Gjej truck-un
    const truck = await Truck.findById(truckID);
    if (!truck) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Truck not found'
      }));
      return;
    }

    // Sigurohu që truck-u i takon user-it
    if (truck.userID !== req.user.userID) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Unauthorized',
        message: 'You can only update your own trucks'
      }));
      return;
    }

    const truckData = {
      currentLocation: currentLocation || truck.currentLocation,
      truckType: truckType || truck.truckType,
      dateAvailable: dateAvailable || truck.dateAvailable,
      maxWeight: maxWeight || truck.maxWeight,
      vanLength: vanLength !== undefined ? vanLength : truck.vanLength,
      width: width !== undefined ? width : truck.width,
      booked: booked !== undefined ? booked : truck.booked
    };

    const updatedTruck = await Truck.update(truckID, truckData);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Truck updated successfully',
      truck: updatedTruck
    }));

  } catch (error) {
    console.error('Update truck error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to update truck'
    }));
  }
}

export async function deleteTruck(req, res) {
  try {
    const { truckID } = req.params;

    // Gjej truck-un
    const truck = await Truck.findById(truckID);
    if (!truck) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Truck not found'
      }));
      return;
    }

    // Sigurohu që truck-u i takon user-it
    if (truck.userID !== req.user.userID) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Unauthorized',
        message: 'You can only delete your own trucks'
      }));
      return;
    }

    await Truck.delete(truckID);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Truck deleted successfully'
    }));

  } catch (error) {
    console.error('Delete truck error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to delete truck'
    }));
  }
}