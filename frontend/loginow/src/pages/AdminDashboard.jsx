import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { deleteTruck } from '../services/truckServices';
import { deleteFreight } from '../services/freightServices';

function AdminDashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem('accessToken');
  const [showUserResults, setShowUserResults] = useState(false);
  const [showTruckResults, setShowTruckResults] = useState(false);
  const [showFreightResults, setShowFreightResults] = useState(false);

  const [totalUsers, setTotalUsers] = useState(null);
  const [totalTrucks, setTotalTrucks] = useState(null);
  const [totalFreight, setTotalFreight] = useState(null);
  const [users, setUsers] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [freight, setFreight] = useState([]);
  // Refresh data when component mounts or when user navigates to this page
  useEffect(() => {
    countUsers();
    countTrucks();
    countFreight();
  }, [location.pathname])

  // Also refresh when window gains focus (user switches back to this tab)
  useEffect(() => {
      countUsers();
      countTrucks();
      countFreight();
    }, []);
  
  async function handleUserClick(){
    try{
      if (!showUserResults) {
        // Fetch users when showing
        const response = await fetch('http://localhost:3000/api/getAllUsers',{
          method:'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          credentials:'include'
        });
        
        if(response.ok){
          const data = await response.json();
          setUsers(data.users || []);
          setShowUserResults(true);
        } else {
          console.error('Failed to fetch users:', response.status);
        }
      } else {
        // Just toggle off
        setShowUserResults(false);
      }
    } catch(err){
      console.log('Error fetching users:', err);
    }
  }

  async function handleDeleteUser(userID){
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try{
      const response = await fetch(`http://localhost:3000/api/users/${userID}`,{
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials:'include'
      });
      
      if(response.ok){
        // Remove user from list
        setUsers(users.filter(user => user.userID !== userID));
        // Update count
        countUsers();
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Failed to delete user:', errorData);
        alert('Failed to delete user: ' + (errorData.error || 'Unknown error'));
      }
    } catch(err){
      console.log('Error deleting user:', err);
      alert('Error deleting user');
    }
  }
  
  async function handleTruckClick(){
    try{
      if (!showTruckResults) {
      // Fetch users when showing
      const response = await fetch('http://localhost:3000/api/getAllTrucks',{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials:'include'
      });
        
      if(response.ok){
        const data = await response.json();
        setTrucks(data.trucks || []);
        setShowTruckResults(true);
      } else {
        console.error('Failed to fetch Trucks:', response.status);
      }
      } else {
        // Just toggle off
        setShowTruckResults(false);
      }
    }catch(err){
      console.log('Error fetching trucks', err)
    }
  }

  async function handleDeleteTruck(truckID){
    if (!window.confirm('Are you sure you want to delete this truck?')) {
      return;
    }

    try{
      const response = await deleteTruck(truckID);
      
      if(response){
        // Remove truck from list
        setTrucks(trucks.filter(truck => truck.truckID !== truckID));
        // Update count
        countTrucks();
      }
    }catch(err){
      console.log('Error deleting truck:', err);
      alert('Failed to delete truck: ' + (err.message || 'Unknown error'));
    }
  }
  async function handleFreightClick(){
    try{
      if (!showFreightResults) {
      // Fetch users when showing
      const response = await fetch('http://localhost:3000/api/adminGetAllFreight',{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials:'include'
      });
        
      if(response.ok){
        const data = await response.json();
        setFreight(data.freight || []);
        setShowFreightResults(true);
      } else {
        console.error('Failed to fetch Freight:', response.status);
      }
      } else {
        // Just toggle off
        setShowFreightResults(false);
      }
    }catch(err){
      console.log('Error fetching Freight', err)
    }
  }

  async function handleDeleteFreight(freightID){
    if (!window.confirm('Are you sure you want to delete this freight?')) {
      return;
    }

    try{
      const res = await deleteFreight(freightID);
      if(res){
        // Remove freight from list
        setFreight(freight.filter(f => f.freightID !== freightID));
        // Update count
        countFreight();
      }
    }catch(err){
      console.log('Error deleting freight:', err);
      alert('Failed to delete freight: ' + (err.message || 'Unknown error'));
    }
  }

  async function countUsers(){
    try{
      const response = await fetch('http://localhost:3000/api/countusers',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      if(response.ok){
        const data = await response.json();
        setTotalUsers(data.total);
      } else {
        console.error('Failed to fetch user count:', response.status);
      }
    }catch(err){
      console.log('Error counting users: ', err)
    }
  }

  async function countTrucks(){
    try{
      const response = await fetch('http://localhost:3000/api/counttrucks',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });
      if(response.ok){
        const data = await response.json();
        setTotalTrucks(data.total);
      }else{
        console.error('Failed to count users', response.status)
      }
    }catch(err){
      console.log('Error', err);
    }
  }

  async function countFreight(){
    try{
      const response = await fetch('http://localhost:3000/api/countfreight',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });
      if(response.ok){
        const data = await response.json();
        setTotalFreight(data.total);
      }else{
        console.error('Failed to count freight')
      }
    }catch(err){
      console.log('Error', err)
    }
  }

  return (
    <div className="flex flex-row h-screen bg-gray-100 overflow-hidden select-none">
      <Navbar />
      <div className='flex-1 flex flex-col overflow-y-auto overflow-x-hidden'>
        {/*User Section*/}
        <div className='bg-[#D9D9D9] ml-5 mb-5 mt-5 mr-5 rounded-xl shrink-0'>
          <div className='flex m-2 justify-between'>
            <h1 className='text-2xl'>Users</h1>
            <button className='bg-[#7ED957] rounded-xl pl-5 pr-5 pt-1 pb-1 mt-1 text-white transition-transform duration-150 hover:scale-105' onClick={handleUserClick}>
              {showUserResults ? 'Hide Users' : 'Get Users'}
            </button>
          </div>
          {/*User Result section*/ }
          <div>
            {!showUserResults && 
              <div className="bg-[#D9D9D9] rounded-lg p-16 text-center">
                <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">👤</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{totalUsers} Users Registered</h3>
              </div>
            }
            {showUserResults && (
              <div className="mt-4 p-4 max-h-96 overflow-y-auto overflow-x-auto">
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.userID}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.userID}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.roleID === 2 ? 'Admin' : 'User'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleDeleteUser(user.userID)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {users.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No users found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {/*Truck Section*/ }
        <div className='bg-[#D9D9D9] ml-5 mb-5 mr-5 rounded-xl shrink-0'>
          <div className='flex m-2 justify-between'>
            <h1 className='text-2xl'>Trucks</h1>
            <button className='bg-[#7ED957] rounded-xl pl-5 pr-5 pt-1 pb-1 mt-1 text-white transition-transform duration-150 hover:scale-105' onClick={handleTruckClick}>{showTruckResults ? 'Hide Trucks' : 'Get Trucks'}</button>
          </div>
          <div>
            {/*Truck result section*/}
            {!showTruckResults && 
              <div className="bg-[#D9D9D9] rounded-lg p-16 text-center">
                <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">🚚</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{totalTrucks} Trucks Available</h3>
              </div>
            }
            {showTruckResults &&
              <div className='mt-4 p-4 max-h-96 overflow-y-auto overflow-x-auto'> 
                <div className='bg-white rounded-lg shadow-md overflow-x-auto'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Truck ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Truck Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poster Username</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Available</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {trucks.map((trucks) => (
                        <tr key={trucks.userID}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trucks.truckID}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trucks.currentLocation}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trucks.truckType}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trucks.username}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {trucks.dateAvailable ? new Date(trucks.dateAvailable).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleDeleteTruck(trucks.truckID)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            }
          </div>
        </div>
        {/*Freight Section*/}
        <div className='bg-[#D9D9D9] ml-5 mb-5 mr-5 rounded-xl shrink-0'>
          <div className='flex m-2 justify-between'>
            <h1 className='text-2xl'>Freight</h1>
            <button className='bg-[#7ED957] rounded-xl pl-5 pr-5 pt-1 pb-1 mt-1 text-white transition-transform duration-150 hover:scale-105' onClick={handleFreightClick}>{showFreightResults ? 'Hide Freight' : 'Get Freight'}</button>
          </div>
          {/*Freight result section */}
          <div>
            {!showFreightResults && 
              <div className="bg-[#D9D9D9] rounded-lg p-16 text-center">
                <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">📦</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{totalFreight} Freight Postings</h3>
              </div>
            }
            {showFreightResults &&
              <div className='mt-4 p-4 max-h-96 overflow-y-auto overflow-x-auto'> 
                <div className='bg-white rounded-lg shadow-md overflow-x-auto'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freight ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Truck Required</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poster Username</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Available</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {freight.map((freight) => (
                        <tr key={freight.userID}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{freight.freightID}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{freight.currentLocation}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{freight.truckType}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{freight.username}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {freight.dateAvailable ? new Date(freight.dateAvailable).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleDeleteFreight(freight.freightID)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;