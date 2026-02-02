import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

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
      const response = await fetch('http://localhost:3000/api/getAllUsers',{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':` Bearer${token}`
        },
        credentials:'include'
      });
      setShowUserResults(!showUserResults);
    } catch(err){
      console.log('Error:',err);
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
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className='flex-1 flex flex-row'>
        {/*User Section*/}
        <div className='bg-[#D9D9D9] m-5 rounded-xl w-full'>
          <div className='flex m-2 justify-between'>
            <h1 className='text-2xl'>Users</h1>
            <button className='bg-[#7ED957] rounded-xl pl-5 pr-5 pt-1 pb-1 mt-1 text-white transition-transform duration-150 hover:scale-105' onClick={handleUserClick}>Get Users</button>
          </div>
          {/*User Result section*/ }
          <div>
            {!showUserResults && 
              <div className="bg-[#D9D9D9] rounded-lg p-16 text-center mt-40">
                <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">👤</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{totalUsers} Users Registered</h3>
              </div>
            }
          </div>
        </div>
        {/*Truck Section*/ }
        <div className='bg-[#D9D9D9] mt-5 mb-5 rounded-xl w-full'>
          <div className='flex m-2 justify-between'>
            <h1 className='text-2xl'>Trucks</h1>
            <button className='bg-[#7ED957] rounded-xl pl-5 pr-5 pt-1 pb-1 mt-1 text-white transition-transform duration-150 hover:scale-105'>Get Trucks</button>
          </div>
          <div>
            {/*Truck result section*/}
            {!showTruckResults && 
              <div className="bg-[#D9D9D9] rounded-lg p-16 text-center mt-40">
                <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">🚚</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{totalTrucks} Trucks Available</h3>
              </div>
            }
          </div>
        </div>
        {/*Freight Section*/}
        <div className='bg-[#D9D9D9] m-5 rounded-xl w-full'>
          <div className='flex m-2 justify-between'>
            <h1 className='text-2xl'>Freight</h1>
            <button className='bg-[#7ED957] rounded-xl pl-5 pr-5 pt-1 pb-1 mt-1 text-white transition-transform duration-150 hover:scale-105'>Get Freight</button>
          </div>
          {/*Freight result section */}
          <div>
            {!showFreightResults && 
              <div className="bg-[#D9D9D9] rounded-lg p-16 text-center mt-40">
                <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">📦</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{totalFreight} Freight Postings</h3>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

