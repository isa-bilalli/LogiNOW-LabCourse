import Navbar from '../components/Navbar';
import { useState } from 'react'

function FindTruck() {
const [searchParams, setSearchParams] = useState({
origin: '',
destination: '',
date: '',
truckType: '',
capacity: ''
});

const [results, setResults] = useState([]);
const [showResults, setShowResults] = useState(false);

const sampleTrucks = [
{
id: 1,
driver: 'John Smith',
truckType: 'Box Truck',
capacity: '5000 kg',
origin: 'Prishtine',
destination: 'Tirane',
date: '2026-01-20',
price: '€450',
rating: 4.8
},
{
id: 2,
driver: 'Maria Garcia',
truckType: 'Flatbed',
capacity: '8000 kg',
origin: 'Shkup',
destination: 'Beograd',
date: '2026-01-22',
price: '€620',
rating: 4.9
},
{
id: 3,
driver: 'David Johnson',
truckType: 'Refrigerated',
capacity: '6000 kg',
origin: 'Prishtine',
destination: 'Zagreb',
date: '2026-01-25',
price: '€780',
rating: 4.7
},
{
id: 4,
driver: 'Anna Muller',
truckType: 'Tanker',
capacity: '10000 kg',
origin: 'Tirane',
destination:'Roma',
date: '2026-01-27',
price: '€850',
rating: 4.9
}
];

const handleChange = (e) => {

setSearchParams({
  ...searchParams,
  [e.target.name]: e.target.value
});
};

const handleSearch = () => {
setResults(sampleTrucks);
setShowResults(true);
};

const handleReset = () => {
setSearchParams({
origin: '',
destination: '',
date: '',
truckType: '',
capacity: ''
});
setShowResults(false);
setResults([]);
};

return (
<div className="flex min-h-screen bg-white">
{/* Navbar */}
<Navbar />


  {/* Main Content */}
  <div className="flex-1 flex flex-col ml-50">
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Search Form Card */}
        <div className="bg-[#D9D9D9] rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Search Criteria</h2>
          
          <div className="space-y-6">
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Origin */}
              <div>
                <label htmlFor="origin" className="block text-sm font-medium text-black mb-2">
                  Origin
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

              {/* Destination */}
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                   Destination
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={searchParams.destination}
                  onChange={handleChange}
                  placeholder="Tirane, Shqiperi"
                  className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                />
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                   Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={searchParams.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                />
              </div>

              {/* Truck Type */}
              <div>
                <label htmlFor="truckType" className="block text-sm font-medium text-gray-700 mb-2">
                  Truck Type
                </label>
                <select
                  id="truckType"
                  name="truckType"
                  value={searchParams.truckType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                >
                  <option value="">Te gjitha</option>
                  <option value="box">Box Truck</option>
                  <option value="flatbed">Flatbed</option>
                  <option value="refrigerated">Refrigerated</option>
                  <option value="tanker">Tanker</option>
                </select>
              </div>

              {/* Capacity */}
              <div className="md:col-span-2">
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity
                </label>
                <input
                  type="text"
                  id="capacity"
                  name="capacity"
                  value={searchParams.capacity}
                  onChange={handleChange}
                  placeholder="5000 kg"
                  className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSearch}
                className="px-6 py-2.5 bg-[#7ED957] text-white font-medium rounded-lg hover:bg-[#6bc245] transition-colors shadow-sm"
              >
                Search Trucks
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
                Available Trucks ({results.length})
              </h2>
              <button className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors">
                 Filter
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map(truck => (
                <div key={truck.id} className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow border-2 border-gray-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#7ED957] rounded-full flex items-center justify-center text-2xl">
                        🚚
                      </div>
                      <div>
                        <h4 className="text-gray-800 font-semibold">{truck.driver}</h4>
                        <p className="text-gray-600 text-sm">{truck.truckType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-gray-800 font-semibold">{truck.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-gray-700">
                    <div className="flex items-center gap-2 text-sm">
                      <span></span>
                      <span>{truck.origin} → {truck.destination}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span></span>
                      <span>{truck.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span></span>
                      <span>Capacity: {truck.capacity}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
                    <span className="text-2xl font-bold text-[#7ED957]">{truck.price}</span>
                    <button className="px-4 py-2 bg-[#7ED957] text-white rounded-lg hover:bg-[#6bc245] transition-colors font-semibold">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!showResults && (
          <div className="bg-[#D9D9D9] rounded-lg shadow-md p-16 text-center">
            <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">
              🚚
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No results yet
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