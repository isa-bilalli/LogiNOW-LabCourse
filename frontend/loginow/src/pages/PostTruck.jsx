import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';

function PostTruck() {
  const [formData, setFormData] = useState({
    currentLocation: '',
    date: '',
    truckType: '',
    maxWeight: ''
  });

  const [myTrucks, setMyTrucks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch user's trucks on component mount
  useEffect(() => {
    fetchMyTrucks();
  }, []);

  const fetchMyTrucks = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch('http://localhost:3000/api/trucks/my', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setMyTrucks(data.trucks || []);
      }
    } catch (err) {
      console.error('Error fetching trucks:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validation
      if (!formData.currentLocation || !formData.date || !formData.truckType || !formData.maxWeight) {
        setError('Ju lutem plotësoni të gjitha fushat!');
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Ju lutem kyçuni për të postuar truck!');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:3000/api/trucks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          currentLocation: formData.currentLocation,
          truckType: formData.truckType,
          dateAvailable: formData.date,
          maxWeight: parseInt(formData.maxWeight)
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Truck u postua me sukses! 🎉');
        handleReset();
        fetchMyTrucks(); // Refresh the list
      } else {
        setError(data.message || 'Gabim gjatë postimit të truck-ut!');
      }
    } catch (err) {
      console.error('Error posting truck:', err);
      setError('Gabim në lidhje me server-in!');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      currentLocation: '',
      date: '',
      truckType: '',
      maxWeight: ''
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 py-6 px-12">
        <div className="space-y-6">
            <div className="bg-[#D9D9D9] rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-xl font-semibold text-black mb-6">
                Truck Details
              </h2>

              {/* Error & Success Messages */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  {success}
                </div>
              )}

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="currentLocation" className="block text-sm font-medium text-black mb-2">
                      Current Location
                    </label>
                    <input
                      type="text"
                      id="currentLocation"
                      name="currentLocation"
                      value={formData.currentLocation}
                      onChange={handleChange}
                      placeholder="Prishtine, Kosove"
                      className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-black mb-2">
                      Date Available
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="truckType" className="block text-sm font-medium text-black mb-2">
                      Van Type
                    </label>
                    <select
                      id="truckType"
                      name="truckType"
                      value={formData.truckType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                    >
                      <option value="">Zgjidh llojin</option>
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
                    <label htmlFor="maxWeight" className="block text-sm font-medium text-black mb-2">
                      Max Weight (kg)
                    </label>
                    <input
                      type="number"
                      id="maxWeight"
                      name="maxWeight"
                      value={formData.maxWeight}
                      onChange={handleChange}
                      placeholder="5000"
                      className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-2.5 bg-[#7ED957] text-white font-medium rounded-lg hover:bg-[#6bc245] transition-colors shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Duke postuar...' : 'Post Truck'}
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-gray-400 text-white font-medium rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* My Posted Trucks */}
            <div className="bg-[#D9D9D9] rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold text-black mb-4">
                My Posted Trucks
              </h3>
              
              {myTrucks.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">
                    🚚
                  </div>
                  <p className="text-gray-600">
                    Nuk keni postuar asnjë truck ende
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myTrucks.map((truck) => (
                    <div key={truck.truckID} className="bg-white p-4 rounded-lg shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-lg font-semibold text-black">
                          {truck.truckType}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(truck.dateAvailable).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>📍 {truck.currentLocation}</p>
                        <p>⚖️ Max Weight: {truck.maxWeight} kg</p>
                        {truck.vanLength && <p>📏 Length: {truck.vanLength}</p>}
                        {truck.width && <p>↔️ Width: {truck.width}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostTruck;