import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getUserTrucks, updateTruck, deleteTruck } from '../services/truckServices';
import { getUserFreight, updateFreight, deleteFreight } from '../services/freightServices';

function Dashboard() {
  const [trucks, setTrucks] = useState([]);
  const [freight, setFreight] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Success/Error messages
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Truck Modal
  const [showTruckModal, setShowTruckModal] = useState(false);
  const [editingTruck, setEditingTruck] = useState(null);
  const [truckFormData, setTruckFormData] = useState({
    currentLocation: '',
    truckType: 'Dry Van',
    dateAvailable: '',
    maxWeight: '',
    vanLength: '',
    width: ''
  });

  // Freight Modal
  const [showFreightModal, setShowFreightModal] = useState(false);
  const [editingFreight, setEditingFreight] = useState(null);
  const [freightFormData, setFreightFormData] = useState({
    pickupLocation: '',
    destination: '',
    vanType: '',
    date: '',
    maxWeight: '',
    price: ''
  });

  // Delete Confirmation Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ type: '', id: null, name: '' });

  useEffect(() => {
    loadData();
  }, []);

  // Auto-hide message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [trucksData, freightData] = await Promise.all([
        getUserTrucks(),
        getUserFreight()
      ]);
      setTrucks(trucksData.filter(t => t && t.dateAvailable));
      setFreight(freightData.filter(f => f && f.dateAvailable));
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load data: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  // ========== TRUCK HANDLERS ==========
  
  const handleTruckChange = (e) => {
    setTruckFormData({
      ...truckFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleTruckSubmit = async () => {
    if (!truckFormData.currentLocation || !truckFormData.truckType || !truckFormData.dateAvailable || !truckFormData.maxWeight) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    try {
      await updateTruck(editingTruck.truckID, truckFormData);
      setMessage({ type: 'success', text: 'Truck updated successfully! ✓' });
      
      setShowTruckModal(false);
      setEditingTruck(null);
      setTruckFormData({
        currentLocation: '',
        truckType: 'Dry Van',
        dateAvailable: '',
        maxWeight: '',
        vanLength: '',
        width: ''
      });
      loadData();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update truck: ' + error.message });
    }
  };

  const handleTruckEdit = (truck) => {
    setEditingTruck(truck);
    setTruckFormData({
      currentLocation: truck.currentLocation,
      truckType: truck.truckType,
      dateAvailable: truck.dateAvailable ? truck.dateAvailable.split('T')[0] : '',
      maxWeight: truck.maxWeight,
      vanLength: truck.vanLength || '',
      width: truck.width || ''
    });
    setShowTruckModal(true);
  };

  const handleTruckDelete = (truck) => {
    setDeleteItem({
      type: 'truck',
      id: truck.truckID,
      name: `${truck.truckType} - ${truck.currentLocation}`
    });
    setShowDeleteModal(true);
  };

  // ========== FREIGHT HANDLERS ==========
  
  const handleFreightChange = (e) => {
    setFreightFormData({
      ...freightFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleFreightSubmit = async () => {
    if (!freightFormData.pickupLocation || !freightFormData.destination || !freightFormData.vanType || !freightFormData.date || !freightFormData.maxWeight || !freightFormData.price) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    try {
      const backendData = {
        pickupLocation: freightFormData.pickupLocation,
        destination: freightFormData.destination,
        vanType: freightFormData.vanType,
        date: freightFormData.date,
        maxWeight: parseInt(freightFormData.maxWeight),
        price: parseInt(freightFormData.price)
      };
      
      await updateFreight(editingFreight.freightID, backendData);
      setMessage({ type: 'success', text: 'Freight updated successfully! ✓' });
      
      setShowFreightModal(false);
      setEditingFreight(null);
      setFreightFormData({
        pickupLocation: '',
        destination: '',
        vanType: '',
        date: '',
        maxWeight: '',
        price: ''
      });
      loadData();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update freight: ' + error.message });
    }
  };

  const handleFreightEdit = (freight) => {
    setEditingFreight(freight);
    setFreightFormData({
      pickupLocation: freight.currentLocation,
      destination: freight.destination,
      vanType: freight.truckType,
      date: freight.dateAvailable ? freight.dateAvailable.split('T')[0] : '',
      maxWeight: freight.maxWeight,
      price: freight.price || ''
    });
    setShowFreightModal(true);
  };

  const handleFreightDelete = (freight) => {
    setDeleteItem({
      type: 'freight',
      id: freight.freightID,
      name: `${freight.truckType} - ${freight.currentLocation} to ${freight.destination}`
    });
    setShowDeleteModal(true);
  };

  // ========== DELETE HANDLER ==========
  
  const confirmDelete = async () => {
    try {
      if (deleteItem.type === 'truck') {
        await deleteTruck(deleteItem.id);
        setMessage({ type: 'success', text: 'Truck deleted successfully! ✓' });
      } else {
        await deleteFreight(deleteItem.id);
        setMessage({ type: 'success', text: 'Freight deleted successfully! ✓' });
      }
      setShowDeleteModal(false);
      setDeleteItem({ type: '', id: null, name: '' });
      loadData();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete: ' + error.message });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex-1 flex flex-col">
        {/* Page Header */}
        <div className="bg-white shadow-sm px-8 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>

        {/* Success/Error Message */}
        {message.text && (
          <div className="px-8 pt-4">
            <div className={`p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' :
              'bg-red-100 border border-red-400 text-red-700'
            }`}>
              <p className="font-medium">{message.text}</p>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 p-6">
          <div className="ml-auto mr-8 max-w-5xl space-y-6">
            
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              
              {/* Posted Trucks Section */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold text-gray-800">Posted Trucks</h2>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {trucks.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg mb-2">No trucks posted yet</p>
                      <p className="text-gray-400 text-sm">Go to "Post Truck" to create one</p>
                    </div>
                  ) : (
                    trucks.map((truck) => (
                      <div key={truck.truckID} className="bg-gray-50 border border-gray-200 rounded p-3 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{truck.truckType}</p>
                            <p className="text-sm text-gray-600">📍 {truck.currentLocation}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Max Weight: {truck.maxWeight} kg | Available: {truck.dateAvailable ? truck.dateAvailable.split('T')[0] : 'N/A'}
                            </p>
                          </div>
                          <div className="flex gap-1 ml-2">
                            <button
                              onClick={() => handleTruckEdit(truck)}
                              className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleTruckDelete(truck)}
                              className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Posted Freight Section */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold text-gray-800">Posted Freight</h2>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {freight.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg mb-2">No freight posted yet</p>
                      <p className="text-gray-400 text-sm">Go to "Post Freight" to create one</p>
                    </div>
                  ) : (
                    freight.map((f) => (
                      <div key={f.freightID} className="bg-gray-50 border border-gray-200 rounded p-3 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{f.truckType}</p>
                            <p className="text-sm text-gray-600">📦 {f.currentLocation} → {f.destination}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Weight: {f.maxWeight} kg | Date: {f.dateAvailable ? f.dateAvailable.split('T')[0] : 'N/A'} | €{f.price}
                            </p>
                          </div>
                          <div className="flex gap-1 ml-2">
                            <button
                              onClick={() => handleFreightEdit(f)}
                              className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleFreightDelete(f)}
                              className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* Coming Soon Banner */}
            <div className="bg-[#7ED957] rounded-lg shadow p-12 text-center">
              <p className="text-3xl font-bold text-white">
                Stay tuned, More is coming
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Truck Edit Modal */}
      {showTruckModal && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-[#7ED957]">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Edit Truck</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Location *
                  </label>
                  <input
                    type="text"
                    name="currentLocation"
                    value={truckFormData.currentLocation}
                    onChange={handleTruckChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED957]"
                    placeholder="New York, NY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Truck Type *
                  </label>
                  <select
                    name="truckType"
                    value={truckFormData.truckType}
                    onChange={handleTruckChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED957]"
                  >
                    <option value="Dry Van">Dry Van</option>
                    <option value="Reefer">Reefer</option>
                    <option value="Tarpauliner">Tarpauliner</option>
                    <option value="Flatbed">Flatbed</option>
                    <option value="Stepdeck">Stepdeck</option>
                    <option value="Lowboy">Lowboy</option>
                    <option value="Tanker">Tanker</option>
                    <option value="Car Carrier">Car Carrier</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Available *
                  </label>
                  <input
                    type="date"
                    name="dateAvailable"
                    value={truckFormData.dateAvailable}
                    onChange={handleTruckChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED957]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Weight (kg) *
                  </label>
                  <input
                    type="number"
                    name="maxWeight"
                    value={truckFormData.maxWeight}
                    onChange={handleTruckChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED957]"
                    placeholder="50000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Van Length (ft)
                  </label>
                  <input
                    type="number"
                    name="vanLength"
                    value={truckFormData.vanLength}
                    onChange={handleTruckChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED957]"
                    placeholder="53"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width (ft)
                  </label>
                  <input
                    type="number"
                    name="width"
                    value={truckFormData.width}
                    onChange={handleTruckChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED957]"
                    placeholder="8.5"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleTruckSubmit}
                className="px-6 py-2.5 bg-[#7ED957] text-white font-medium rounded-lg hover:bg-[#6bc245] transition-colors shadow-md"
              >
                Update Truck
              </button>
              <button
                onClick={() => {
                  setShowTruckModal(false);
                  setEditingTruck(null);
                }}
                className="px-6 py-2.5 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Freight Edit Modal */}
      {showFreightModal && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-[#7ED957]">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Edit Freight</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Location *
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={freightFormData.pickupLocation}
                    onChange={handleFreightChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED957]"
                    placeholder="Chicago, IL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Location *
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={freightFormData.destination}
                    onChange={handleFreightChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED957]"
                    placeholder="Miami, FL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Van Type *
                  </label>
                  <select
                    name="vanType"
                    value={freightFormData.vanType}
                    onChange={handleFreightChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED957]"
                  >
                    <option value="">Select type</option>
                    <option value="Dry Van">Dry Van</option>
                    <option value="Reefer">Reefer</option>
                    <option value="Tarpauliner">Tarpauliner</option>
                    <option value="Flatbed">Flatbed</option>
                    <option value="Stepdeck">Stepdeck</option>
                    <option value="Lowboy">Lowboy</option>
                    <option value="Tanker">Tanker</option>
                    <option value="Car Carrier">Car Carrier</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={freightFormData.date}
                    onChange={handleFreightChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED957]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Weight (kg) *
                  </label>
                  <input
                    type="number"
                    name="maxWeight"
                    value={freightFormData.maxWeight}
                    onChange={handleFreightChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED957]"
                    placeholder="10000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (€) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={freightFormData.price}
                    onChange={handleFreightChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED957]"
                    placeholder="5000"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleFreightSubmit}
                className="px-6 py-2.5 bg-[#7ED957] text-white font-medium rounded-lg hover:bg-[#6bc245] transition-colors shadow-md"
              >
                Update Freight
              </button>
              <button
                onClick={() => {
                  setShowFreightModal(false);
                  setEditingFreight(null);
                }}
                className="px-6 py-2.5 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl border-4 border-red-500">
            <h3 className="text-2xl font-bold mb-4 text-red-600">Confirm Delete</h3>
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete this {deleteItem.type}?
            </p>
            <p className="mb-6 text-sm text-gray-600 font-semibold">
              {deleteItem.name}
            </p>
            <p className="mb-6 text-sm text-red-600">
              ⚠️ This action cannot be undone!
            </p>
            <div className="flex gap-4">
              <button
                onClick={confirmDelete}
                className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteItem({ type: '', id: null, name: '' });
                }}
                className="px-6 py-2.5 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;