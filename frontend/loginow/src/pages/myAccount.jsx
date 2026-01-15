import { useState } from 'react';
import Navbar from '../components/Navbar';

function MyAccount() {
  const [formData, setFormData] = useState({
    name: 'Festim Ismaili',
    email: 'festim.ismaili@example.com',
    phone: '0629697386',
    company: 'Logistics Inc.',
    location: 'New York, NY'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    console.log('Saving data:', formData);
  };

  const handleCancel = () => {
    setFormData({
      name: 'Festim Ismaili',
      email: 'festim.ismaili@example.com',
      phone: '0629697386',
      company: 'Logistics Inc.',
      location: 'New York, NY'
    });
  };

  return (
    <div className="flex min-h-screen bg-white text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Profile Card */}
            <div className="bg-[#D9D9D9] rounded-lg shadow-md p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center">
                    <div className="text-black text-5xl font-bold">
                      {formData.name.charAt(0)}
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <div className="flex-1 w-full">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    {formData.name}
                  </h2>

                  <div className="space-y-6">
                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                        />
                      </div>

                      {/* Location */}
                      <div className="md:col-span-2">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="City, State"
                          className="w-full px-4 py-2 bg-white text-black border-[#7ED957] border-2 rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={handleSave}
                        className="px-6 py-2.5 bg-[#7ED957] text-white font-medium rounded-lg hover:bg-[#6bc245] transition-colors shadow-sm"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-6 py-2.5 bg-gray-400 text-white font-medium rounded-lg hover:bg-gray-500 transition-colors focus:outline-none"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Settings Section */}
            <div className="mt-6 bg-[#D9D9D9] rounded-lg shadow-md p-8">
              <div className="space-y-4">
                <button className="w-full text-left px-4 py-3 rounded-lg hover:scale-101 transition-transform text-white bg-[#7ED957]">
                  Change Password
                </button>
                <button className="w-full text-left px-4 py-3 text-white rounded-lg bg-red-600 hover:scale-101 transition-transform">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;