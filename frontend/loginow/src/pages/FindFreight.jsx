import Navbar from '../components/Navbar';
import { useState } from 'react';

function FindFreight() {
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    date: '',
    freightType: '',
    weight: ''
  });

  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const sampleFreights = [
    {
      id: 1,
      company: 'ABC Logistics',
      freightType: 'Electronics',
      weight: '3500 kg',
      origin: 'Prishtine',
      destination: 'Munchen',
      date: '2026-01-21',
      payment: '850 EUR',
      distance: '1200 km',
      rating: 4.9,
      urgent: false
    },
    {
      id: 2,
      company: 'Euro Transport',
      freightType: 'Food Products',
      weight: '5000 kg',
      origin: 'Tirane',
      destination: 'Milano',
      date: '2026-01-23',
      payment: '920 EUR',
      distance: '850 km',
      rating: 4.7,
      urgent: true
    },
    {
      id: 3,
      company: 'Global Shipping',
      freightType: 'Construction Materials',
      weight: '8000 kg',
      origin: 'Shkup',
      destination: 'Wien',
      date: '2026-01-26',
      payment: '1150 EUR',
      distance: '950 km',
      rating: 4.8,
      urgent: false
    },
    {
      id: 4,
      company: 'Fast Cargo',
      freightType: 'Textiles',
      weight: '2500 kg',
      origin: 'Prishtine',
      destination: 'Roma',
      date: '2026-01-24',
      payment: '680 EUR',
      distance: '1100 km',
      rating: 4.6,
      urgent: false
    }
  ];

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = () => {
    setResults(sampleFreights);
    setShowResults(true);
  };

  const handleReset = () => {
    setSearchParams({
      origin: '',
      destination: '',
      date: '',
      freightType: '',
      weight: ''
    });
    setShowResults(false);
    setResults([]);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Navbar />

      <div className="flex-1 flex flex-col ml-50">
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
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
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                       Pickup Date
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

                  <div>
                    <label htmlFor="freightType" className="block text-sm font-medium text-gray-700 mb-2">
                       Freight Type
                    </label>
                    <select
                      id="freightType"
                      name="freightType"
                      value={searchParams.freightType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                    >
                      <option value="">Te gjitha</option>
                      <option value="electronics">Electronics</option>
                      <option value="food">Food Products</option>
                      <option value="construction">Construction Materials</option>
                      <option value="machinery">Machinery</option>
                      <option value="textiles">Textiles</option>
                      <option value="general">General Cargo</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                       Weight
                    </label>
                    <input
                      type="text"
                      id="weight"
                      name="weight"
                      value={searchParams.weight}
                      onChange={handleChange}
                      placeholder="5000 kg"
                      className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSearch}
                    className="px-6 py-2.5 bg-[#7ED957] text-white font-medium rounded-lg hover:bg-[#6bc245] transition-colors shadow-sm"
                  >
                     Search Freight
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

            {showResults && (
              <div className="bg-[#D9D9D9] rounded-lg shadow-md p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Available Freight ({results.length})
                  </h2>
                  <button className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors">
                     Filter
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map(freight => (
                    <div
                      key={freight.id}
                      className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow relative border-2 border-gray-300"
                    >
                      {freight.urgent && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                            URGENT
                          </span>
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#7ED957] rounded-full flex items-center justify-center text-2xl">
                            📦
                          </div>
                          <div>
                            <h4 className="text-gray-800 font-semibold">
                              {freight.company}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {freight.freightType}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-gray-800 font-semibold">
                            {freight.rating}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4 text-gray-700">
                        <div className="flex items-center gap-2 text-sm">
                          <span></span>
                          <span>{freight.origin} → {freight.destination}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span></span>
                          <span>{freight.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span></span>
                          <span>Weight: {freight.weight}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span></span>
                          <span>Distance: {freight.distance}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
                        <span className="text-2xl font-bold text-[#7ED957]">
                          {freight.payment}
                        </span>
                        <button className="px-4 py-2 bg-[#7ED957] text-white rounded-lg hover:bg-[#6bc245] transition-colors font-semibold">
                          Accept
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!showResults && (
              <div className="bg-[#D9D9D9] rounded-lg shadow-md p-16 text-center">
                <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">
                  📦
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No results yet
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