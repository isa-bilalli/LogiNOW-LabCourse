import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';

function FindTruck() {
  const [searchParams, setSearchParams] = useState({
    currentLocation: '',
    truckType: '',
    maxWeight: ''
  });

  const [allTrucks, setAllTrucks] = useState([]);
  const [filteredTrucks, setFilteredTrucks] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all trucks on component mount
  useEffect(() => {
    fetchAllTrucks();
  }, []);

  const fetchAllTrucks = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/trucks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAllTrucks(data.trucks || []);
      }
    } catch (err) {
      console.error('Error fetching trucks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = () => {
    // Filter trucks based on search params
    let filtered = allTrucks;

    if (searchParams.currentLocation) {
      filtered = filtered.filter(truck =>
        truck.currentLocation.toLowerCase().includes(searchParams.currentLocation.toLowerCase())
      );
    }

    if (searchParams.truckType) {
      filtered = filtered.filter(truck =>
        truck.truckType === searchParams.truckType
      );
    }

    if (searchParams.maxWeight) {
      filtered = filtered.filter(truck =>
        truck.maxWeight >= parseInt(searchParams.maxWeight)
      );
    }

    setFilteredTrucks(filtered);
    setShowResults(true);
  };

  const handleReset = () => {
    setSearchParams({
      currentLocation: '',
      truckType: '',
      maxWeight: ''
    });
    setShowResults(false);
    setFilteredTrucks([]);
  };

  const displayTrucks = showResults ? filteredTrucks : [];

  return (
    <div className="flex min-h-screen bg-white">
      <Navbar />

      <div className="flex-1 flex flex-col ml-50">
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Search Form Card */}
            <div className="bg-[#D9D9D9] rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Search Criteria</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Location */}
                  <div>
                    <label htmlFor="currentLocation" className="block text-sm font-medium text-black mb-2">
                      Current Location
                    </label>
                    <input
                      type="text"
                      id="currentLocation"
                      name="currentLocation"
                      value={searchParams.currentLocation}
                      onChange={handleChange}
                      placeholder="Prishtine, Kosove"
                      className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                    />
                  </div>

                  {/* Van Type */}
                  <div>
                    <label htmlFor="truckType" className="block text-sm font-medium text-gray-700 mb-2">
                      Van Type
                    </label>
                    <select
                      id="truckType"
                      name="truckType"
                      value={searchParams.truckType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                    >
                      <option value="">Te gjitha</option>
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

                  {/* Max Weight */}
                  <div className="md:col-span-2">
                    <label htmlFor="maxWeight" className="block text-sm font-medium text-gray-700 mb-2">
                      Min Capacity (kg)
                    </label>
                    <input
                      type="number"
                      id="maxWeight"
                      name="maxWeight"
                      value={searchParams.maxWeight}
                      onChange={handleChange}
                      placeholder="5000"
                      className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="px-6 py-2.5 bg-[#7ED957] text-white font-medium rounded-lg hover:bg-[#6bc245] transition-colors shadow-sm disabled:bg-gray-400"
                  >
                    {loading ? 'Loading...' : 'Search Trucks'}
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

            {/* Results Section */}
            {showResults && (
              <div className="bg-[#D9D9D9] rounded-lg shadow-md p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Available Trucks ({displayTrucks.length})
                  </h2>
                </div>

                {displayTrucks.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Nuk u gjetën trucks me këto kritere</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayTrucks.map(truck => (
                      <div key={truck.truckID} className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow border-2 border-gray-300">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#7ED957] rounded-full flex items-center justify-center text-2xl">
                              🚚
                            </div>
                            <div>
                              <h4 className="text-gray-800 font-semibold">{truck.truckType}</h4>
                              <p className="text-gray-600 text-sm">{truck.username || 'Owner'}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4 text-gray-700">
                          <div className="flex items-center gap-2 text-sm">
                            <span>📍</span>
                            <span>{truck.currentLocation}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span>📅</span>
                            <span>{new Date(truck.dateAvailable).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span>⚖️</span>
                            <span>Max: {truck.maxWeight} kg</span>
                          </div>
                          {truck.vanLength && (
                            <div className="flex items-center gap-2 text-sm">
                              <span>📏</span>
                              <span>Length: {truck.vanLength}</span>
                            </div>
                          )}
                          {truck.phoneNumber && (
                            <div className="flex items-center gap-2 text-sm font-semibold text-[#7ED957]">
                              <span>📞</span>
                              <span>{truck.phoneNumber}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {!showResults && (
              <div className="bg-[#D9D9D9] rounded-lg shadow-md p-16 text-center">
                <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">
                  🚚
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {loading ? 'Loading trucks...' : `${allTrucks.length} trucks available`}
                </h3>
                <p className="text-gray-600">
                  Use the search form above to find available trucks
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindTruck;