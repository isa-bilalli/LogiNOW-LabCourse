import Navbar from '../components/Navbar';
import { useState } from 'react';

function PostFreight() {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    freightType: '',
    weight: '',
    payment: '',
    description: ''
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
      origin: '',
      destination: '',
      date: '',
      freightType: '',
      weight: '',
      payment: '',
      description: ''
    });
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Navbar />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Post Freight</h1>
              <p className="text-gray-600 mt-1">
                Posto ngarkesen tende per transport
              </p>
            </div>

            <div className="bg-[#D9D9D9] rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Freight Details
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
                      value={formData.origin}
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
                      value={formData.destination}
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
                      value={formData.date}
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
                      value={formData.freightType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                    >
                      <option value="">Zgjidh llojin</option>
                      <option value="electronics">Electronics</option>
                      <option value="food">Food Products</option>
                      <option value="construction">Construction Materials</option>
                      <option value="machinery">Machinery</option>
                      <option value="textiles">Textiles</option>
                      <option value="general">General Cargo</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                       Weight
                    </label>
                    <input
                      type="text"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="5000 kg"
                      className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-2">
                       Payment Offered
                    </label>
                    <input
                      type="text"
                      id="payment"
                      name="payment"
                      value={formData.payment}
                      onChange={handleChange}
                      placeholder="850 EUR"
                      className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                       Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Pershkruaj detaje shtese per ngarkesen..."
                      rows="4"
                      className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none resize-none"
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
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Ready to Post?
              </h3>
              <p className="text-gray-600">
                Ploteso formen me lart per te postuar ngarkesen tende
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostFreight;