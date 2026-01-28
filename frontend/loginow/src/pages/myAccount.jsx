import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { createProfile, getAllProfiles, updateProfile, deleteProfile } from '../services/profileServices.js';

function MyAccount() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    location: ''
  });

  // Load all profiles on mount
  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const data = await getAllProfiles();
      setProfiles(data);
    } catch (error) {
      alert('Failed to load profiles: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.fullName || !formData.email || !formData.phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      if (editingProfile) {
        // Update existing profile
        await updateProfile(editingProfile.profileID, formData);
        alert('Profile updated successfully!');
      } else {
        // Create new profile
        await createProfile(formData);
        alert('Profile created successfully!');
      }
      
      // Reset and reload
      setShowModal(false);
      setEditingProfile(null);
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        companyName: '',
        location: ''
      });
      loadProfiles();
    } catch (error) {
      alert('Failed to save profile: ' + error.message);
    }
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setFormData({
      fullName: profile.fullName,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      companyName: profile.companyName || '',
      location: profile.location || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (profileID) => {
    if (!window.confirm('Are you sure you want to delete this profile?')) {
      return;
    }

    try {
      await deleteProfile(profileID);
      alert('Profile deleted successfully!');
      loadProfiles();
    } catch (error) {
      alert('Failed to delete profile: ' + error.message);
    }
  };

  const handleAddNew = () => {
    setEditingProfile(null);
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      companyName: '',
      location: ''
    });
    setShowModal(true);
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
        <div className="bg-white shadow-sm px-8 py-6 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">My Profiles</h1>
          <button
            onClick={handleAddNew}
            className="px-6 py-2.5 bg-[#7ED957] text-white font-medium rounded-lg hover:bg-[#6bc245] transition-colors shadow-sm"
          >
            + Add New Profile
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Profiles Grid */}
            {profiles.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-xl text-gray-600 mb-4">No profiles yet</p>
                <button
                  onClick={handleAddNew}
                  className="px-6 py-2.5 bg-[#7ED957] text-white font-medium rounded-lg hover:bg-[#6bc245] transition-colors"
                >
                  Create Your First Profile
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map((profile) => (
                  <div key={profile.profileID} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mr-4">
                        <div className="text-white text-2xl font-bold">
                          {profile.fullName.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{profile.fullName}</h3>
                        <p className="text-sm text-gray-600">{profile.companyName || 'No Company'}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Email:</span> {profile.email}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Phone:</span> {profile.phoneNumber}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Location:</span> {profile.location || 'N/A'}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(profile)}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(profile.profileID)}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-[#7ED957]">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              {editingProfile ? 'Edit Profile' : 'Add New Profile'}
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED957] focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED957] focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED957] focus:border-transparent"
                    placeholder="1234567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED957] focus:border-transparent"
                    placeholder="ABC Corp"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED957] focus:border-transparent"
                    placeholder="New York, NY"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-[#7ED957] text-white font-medium rounded-lg hover:bg-[#6bc245] transition-colors shadow-md"
              >
                {editingProfile ? 'Update Profile' : 'Create Profile'}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingProfile(null);
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

export default MyAccount;