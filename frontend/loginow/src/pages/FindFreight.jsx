import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';

function FindFreight() {
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    truckType: '',
    maxWeight: ''
  });

  const [allFreights, setAllFreights] = useState([]);
  const [filteredFreights, setFilteredFreights] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all freights on component mount
  useEffect(() => {
    fetchAllFreights();
  }, []);

  const fetchAllFreights = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/freights', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAllFreights(data.freights || []);
      }
    } catch (err) {
      console.error('Error fetching freights:', err);
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
    // Filter freights based on search params
    let filtered = allFreights;

    if (searchParams.origin) {
      filtered = filtered.filter(freight =>
        freight.currentLocation.toLowerCase().includes(searchParams.origin.toLowerCase())
      );
    }

    if (searchParams.destination) {
      filtered = filtered.filter(freight =>
        freight.destination.toLowerCase().includes(searchParams.destination.toLowerCase())
      );
    }

    if (searchParams.truckType) {
      filtered = filtered.filter(freight =>
        freight.truckType === searchParams.truckType
      );
    }

    if (searchParams.maxWeight) {
      filtered = filtered.filter(freight =>
        freight.maxWeight >= parseInt(searchParams.maxWeight)
      );
    }

    setFilteredFreights(filtered);
    setShowResults(true);
  };

  const handleReset = () => {
    setSearchParams({
      origin: '',
      destination: '',
      truckType: '',
      maxWeight: ''
    });
    setShowResults(false);
    setFilteredFreights([]);
  };

  const displayFreights = showResults ? filteredFreights : [];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 py-6 px-12">
          <div className="space-y-6">
            {/* Search Form Card */}
            <div className="bg-[#D9D9D9] rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Search Criteria
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      id="origin"
                      name="origin"
                      value={searchParams.origin}
                      onChange={handleChange}
                      placeholder="Prishtine, Kosove"
                      className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Location
                    </label>
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      value={searchParams.destination}
                      onChange={handleChange}
                      placeholder="Munchen, Gjermani"
                      className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                    />
                  </div>

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

                  <div>
                    <label htmlFor="maxWeight" className="block text-sm font-medium text-gray-700 mb-2">
                      Min Weight (kg)
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

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="px-6 py-2.5 bg-[#7ED957] text-white font-medium rounded-lg hover:bg-[#6bc245] transition-colors shadow-sm disabled:bg-gray-400"
                  >
                    {loading ? 'Loading...' : 'Search Freight'}
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
                    Available Freight ({displayFreights.length})
                  </h2>
                </div>

                {displayFreights.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Nuk u gjetën freights me këto kritere</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayFreights.map(freight => (
                      <div
                        key={freight.freightID}
                        className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow border-2 border-gray-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#7ED957] rounded-full flex items-center justify-center text-2xl">
                              📦
                            </div>
                            <div>
                              <h4 className="text-gray-800 font-semibold">
                                {freight.truckType}
                              </h4>
                              <p className="text-gray-600 text-sm">
                                {freight.username || 'Owner'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4 text-gray-700">
                          <div className="flex items-center gap-2 text-sm">
                            <span>📍</span>
                            <span>{freight.currentLocation} → {freight.destination}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span>📅</span>
                            <span>{new Date(freight.dateAvailable).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span>⚖️</span>
                            <span>Weight: {freight.maxWeight} kg</span>
                          </div>
                          {freight.phoneNumber && (
                            <div className="flex items-center gap-2 text-sm font-semibold text-[#7ED957]">
                              <span>📞</span>
                              <span>{freight.phoneNumber}</span>
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
                  📦
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {loading ? 'Loading freights...' : `${allFreights.length} freights available`}
                </h3>
                <p className="text-gray-600">
                  Use the search form above to find available freight
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default FindFreight;