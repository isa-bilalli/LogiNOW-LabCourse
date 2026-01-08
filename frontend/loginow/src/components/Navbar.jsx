import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-[#D9D9D9] w-50 min-h-screen flex flex-col items-center pt-4 px-4">
      <img src="/src/assets/LogiNOW_WHITE-removebg-preview.png" className="w-36 sm:w-40 md:w-44 h-auto mb-10" alt="Logo"/>
      <div className="flex flex-col w-full space-y-6">
        <NavLink to="/dashboard" className={({ isActive }) => `text-lg font-medium text-center py-2 px-4 rounded-lg transition-colors duration-100 text-white ${isActive ? "bg-[#7ED957]":"hover:bg-[#B4B4B4]"}`}>Dashboard</NavLink>
        <NavLink to="/postfreight" className={({ isActive }) => `text-lg font-medium text-center py-2 px-4 rounded-lg transition-colors duration-100 text-white ${isActive ? "bg-[#7ED957]":"hover:bg-[#B4B4B4]"}`}>Post Freight</NavLink>
        <NavLink to="/findfreight" className={({ isActive }) => `text-lg font-medium text-center py-2 px-4 rounded-lg transition-colors duration-100 text-white ${isActive ? "bg-[#7ED957]":"hover:bg-[#B4B4B4]"}`}>Find Freight</NavLink>
        <NavLink to="/posttruck" className={({ isActive }) => `text-lg font-medium text-center py-2 px-4 rounded-lg transition-colors duration-100 text-white ${isActive ? "bg-[#7ED957]":"hover:bg-[#B4B4B4]"}`}>Post Truck</NavLink>
        <NavLink to="/findtruck" className={({ isActive }) => `text-lg font-medium text-center py-2 px-4 rounded-lg transition-colors duration-100 text-white ${isActive ? "bg-[#7ED957]":"hover:bg-[#B4B4B4]"}`}>Find Truck</NavLink>
        <NavLink to="/myaccount" className={({ isActive }) => `text-lg font-medium text-center py-2 px-4 rounded-lg transition-colors duration-100 text-white ${isActive ? "bg-[#7ED957]":"hover:bg-[#B4B4B4]"}`}>My Account</NavLink>
      </div>
      <div className="mt-auto mb-6 w-full flex justify-center">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80"><img src="/src/assets/logout-Photoroom.png" className="w-16 h-16 object-contain" alt="Logout Icon"/></Link>
      </div>
    </nav>
  );
}

export default Navbar;