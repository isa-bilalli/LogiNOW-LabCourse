import Navbar from '../components/Navbar';
import { useState } from 'react';

function PostFreight() {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    destination: '',
    date: '',
    vanType: '',
    maxWeight: '',
    price: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Posting freight:', formData);
    // Backend integration do te shtohet ketu
  };

  const handleReset = () => {
    setFormData({
      pickupLocation: '',
      destination: '',
      date: '',
      vanType: '',
      maxWeight: '',
      price: ''
    });
  };

  return (
    <div className="flex min-h-screen bg-white ml-50">
      <Navbar />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-8 pl-16 pr-16">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#D9D9D9] rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-xl font-semibold text-black mb-6">
                Freight Details
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="pickupLocation" className="block text-sm font-medium text-black mb-2">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      id="pickupLocation"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      placeholder="Prishtine, Kosove"
                      className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-black mb-2">
                      Delivery Location
                    </label>
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="Munchen, Gjermani"
                      className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-black mb-2">
                      Pickup Date
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
                    <label htmlFor="vanType" className="block text-sm font-medium text-black mb-2">
                      Van Type
                    </label>
                    <select
                      id="vanType"
                      name="vanType"
                      value={formData.vanType}
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

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-black mb-2">
                      Price (EUR)
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="850"
                      className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 bg-[#7ED957] text-white font-medium rounded-lg hover:bg-[#6bc245] transition-colors shadow-sm"
                  >
                    Post Freight
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

            <div className="bg-[#D9D9D9] rounded-lg shadow-md p-16 text-center">
              <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">
                📦
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                My Posted Freights
              </h3>
              <p className="text-gray-600">
                Ngarkeset e postuara do te shfaqen ketu
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostFreight;