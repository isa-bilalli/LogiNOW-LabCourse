import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <>
      <div className="relative w-full h-70 sm:h-80 md:h-100 lg:h-120">
        <img src="/src/assets/gen4.jpg" className="w-full h-full object-cover opacity-70"/>
        <div className="absolute inset-0 flex flex-col md:flex-row items-start p-4 sm:p-6 md:p-8 lg:p-10 md:justify-between justify-start">
          <img src="/src/assets/LogiNOW_WHITE-removebg-preview.png" className="w-20 sm:w-32 md:w-48 lg:w-56 h-auto mb-4 md:mb-0 pointer-events-none select-none"/>
          <div className="pt-5 mt-4 md:mt-0 md:mr-6 lg:mr-10">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight select-none">Move Freight.<br />Faster.<br />Smarter.</h1>
            <Link to="/login"><button className="mt-4 p-1 bg-[#7ED957] text-white rounded-lg ml-1 sm:ml-2 md:ml-3 lg:ml-4 sm:p-2 md:p-3 lg:px-4 sm:py-2 md:py-2 lg:py-2 transition-transform duration-300 hover:scale-105">Get Started</button></Link>
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col md:flex-row justify-around gap-6 px-4 md:px-0'>
        <div className='flex flex-col items-center bg-white p-4 md:p-6 w-full md:w-1/4'>
          <img src="/src/assets/png-truck-icon.png" className='w-22 sm:w-26 md:w-30 lg:w-34 h-auto pointer-events-none select-none' />
          <h1 className='font-bold text-center text-lg sm:text-xl md:text-2xl lg:text-4xl leading-snug'>Browse the load<br/>board</h1>
          <p className="text-center mt-5 text-sm sm:text-base md:text-base">Never drive empty again. With our powerful load board, you get instant access to thousands of available freight listings tailored to your route, equipment, and schedule.</p>
        </div>
        <div className='flex flex-col items-center bg-white p-4 md:p-6 w-full md:w-1/4'>
          <img src="/src/assets/location-icon-png.png" className='w-22 sm:w-26 md:w-30 lg:w-34 h-auto pointer-events-none select-none' />
          <h1 className='font-bold text-center text-lg sm:text-xl md:text-2xl lg:text-4xl leading-snug'>Track your<br/>equipment</h1>
          <p className='text-center mt-5 text-sm sm:text-base md:text-base'>Stay in control, every kilometer of the way. You’ll always know where your freight is, no guessing, no phone calls, just full visibility at your fingertips.</p>
        </div>
        <div className='flex flex-col items-center bg-white p-4 md:p-6 w-full md:w-1/4'>
          <img src="/src/assets/freight-icon.png" className='w-22 sm:w-26 md:w-30 lg:w-34 h-auto pointer-events-none select-none'/>
          <h1 className='font-bold text-center text-lg sm:text-xl md:text-2xl lg:text-4xl leading-snug'>Post your<br/>freight</h1>
          <p className='text-center mt-5 text-sm sm:text-base md:text-base'>Gain access to our reliable network of carriers across the region. Whether its a single pallet or a full-truck load, our platform makes it easy to list your freight.</p>
        </div>
      </div>
      <div className='mb-6 flex items-center justify-center'>
        <Link to="/register"><button className="mt-4 p-1 bg-[#7ED957] text-white rounded-lg ml-1 sm:ml-2 md:ml-3 lg:ml-4 sm:p-2 md:p-3 lg:px-4 sm:py-2 md:py-2 lg:py-2 shadow-2xl transition-transform duration-300 hover:scale-105">Join Our Network</button></Link>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8 mt-10 px-4 md:px-6 lg:px-10 mb-10">
        <div className="flex flex-col gap-6 lg:w-1/2">
          <div className="bg-[#F0F0F0] rounded-xl p-5 flex flex-col items-center justify-center">
            <h1 className="font-bold text-center text-lg sm:text-xl md:text-2xl lg:text-4xl leading-snug">Centralize your <br />logistics operation</h1>
            <p className="text-center mt-2 text-sm sm:text-base md:text-base">Using our software, you can oversee all incoming and outgoings, helping you analyze information, make well-informed decisions, reduce overhead while maximizing profitability, all just one click away.</p>
            <Link to="/register"><button className="mt-4 px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2 md:py-2 lg:py-2 bg-[#7ED957] text-white rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105">Begin Now</button></Link>
          </div>
          <div className="bg-[#F0F0F0] rounded-xl p-5 flex flex-col items-center justify-center">
            <h1 className="font-bold text-center text-lg sm:text-xl md:text-2xl lg:text-4xl leading-snug">Contract Support</h1>
            <div className='flex'>
              <img src="/src/assets/free-phone-icon-1-thumb.png" className="w-6 sm:w-8 md:w-9 lg:w-10 h-auto mt-4 mb-4" alt="Phone Icon"/>
              <p className='mt-5 font-bold'>+383 (0) 48 185 742</p>
            </div>
            <div className='flex'>
              <img src="/src/assets/free-phone-icon-1-thumb.png" className="w-6 sm:w-8 md:w-9 lg:w-10 h-auto mt-4 mb-4" alt="Phone Icon"/>
              <p className='mt-5 mb-4 font-bold'>+383 (0) 48 555 666</p>
            </div>
            <div className='flex'>
              <img src="/src/assets/free-phone-icon-1-thumb.png" className="w-6 sm:w-8 md:w-9 lg:w-10 h-auto mt-4 mb-4" alt="Phone Icon"/>
              <p className='mt-5 mb-4 font-bold'>+381 (0) 62 177 548</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 bg-[#F0F0F0] rounded-xl p-5 flex flex-col justify-center items-center">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-4xl leading-snug text-center mb-6">Tell us how we can do<br />better.</h1>
          <form className="w-full flex flex-col items-center">
            <textarea placeholder="Write a review..." className="w-full sm:w-11/12 md:w-10/12 h-40 sm:h-48 md:h-56 p-3 bg-white rounded mb-4 resize-none"></textarea>
            <input type="email" placeholder="Enter your email" className="w-full sm:w-11/12 md:w-10/12 p-3 bg-white rounded mb-4"/>
            <button className="w-full sm:w-1/2 md:w-1/3 px-4 py-2 bg-[#7ED957] text-white rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105">Submit</button>
          </form>
        </div>
      </div>
      <footer>
        <div className="w-full bg-[#D9D9D9] text-white py-2 flex flex-col md:flex-row justify-between items-center px-4 md:px-10">
          <img src="/src/assets/LogiNOW_WHITE-removebg-preview.png" className="w-24 sm:w-32 md:w-40 h-auto mb-4 md:mb-0"/>
          <p className="text-center text-sm sm:text-base md:text-base select-none">© {new Date().getFullYear()} LogiNOW. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;