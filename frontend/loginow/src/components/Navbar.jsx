import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-[#D9D9D9] w-50 h-screen flex flex-col items-center pt-4 px-4">
      
      {/* Logo */}
      <img 
        src="/src/assets/LogiNOW_WHITE-removebg-preview.png" 
        className="w-36 sm:w-40 md:w-44 h-auto mb-10" 
        alt="Logo"
      />

      {/* Navigation Links */}
      <div className="flex flex-col w-full space-y-6">
        <Link to="/dashboard" className="text-lg font-medium text-center py-2 px-4 rounded-lg bg-[#D9D9D9] hover:bg-[#B4B4B4] transition-colors text-white">Dashboard</Link>
        <Link to="/postfreight" className="text-lg font-medium text-center py-2 px-4 rounded-lg bg-[#D9D9D9] hover:bg-[#B4B4B4] transition-colors text-white">Post Freight</Link>
        <Link to="/findfreight" className="text-lg font-medium text-center py-2 px-4 rounded-lg bg-[#D9D9D9] hover:bg-[#B4B4B4] transition-colors text-white">Find Freight</Link>
        <Link to="/posttruck" className="text-lg font-medium text-center py-2 px-4 rounded-lg bg-[#D9D9D9] hover:bg-[#B4B4B4] transition-colors text-white">Post Truck</Link>
        <Link to="/findtruck" className="text-lg font-medium text-center py-2 px-4 rounded-lg bg-[#D9D9D9] hover:bg-[#B4B4B4] transition-colors text-white">Find Truck</Link>
        <Link to="/myaccount" className="text-lg font-medium text-center py-2 px-4 rounded-lg bg-[#D9D9D9] hover:bg-[#B4B4B4] transition-colors text-white">My Account</Link>
      </div>
      <div className="mt-auto mb-6 w-full flex justify-center">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80"><img src="/src/assets/logout-Photoroom.png" className="w-20 h-20 object-contain" alt="Logout Icon"/></Link>
      </div>
    </nav>
  );
}

export default Navbar;