import Navbar from '../components/Navbar';

function Dashboard() {
  // Sample empty arrays for cards (5 cards each)
  const postedTrucks = Array(6).fill(null);
  const postedFreight = Array(6).fill(null);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Content Area */}
        <div className="flex-1 p-6">
          <div className="max-w-8xl space-y-6 sm:ml-50 md:ml-50 lg:ml-50">
            
            {/* Two Column Layout for Posted Trucks and Posted Freight */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              
              {/* Posted Trucks Section */}
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-bold text-black mb-3 select-none text-center">
                  Posted Trucks
                </h2>
                <div className="space-y-2">
                  {postedTrucks.map((_, index) => (
                    <div
                      key={index}
                      className="h-16 bg-gray-100 border border-gray-200 rounded"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Posted Freight Section */}
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-bold text-black mb-3 select-none text-center">
                  Posted Freight
                </h2>
                <div className="space-y-2">
                  {postedFreight.map((_, index) => (
                    <div
                      key={index}
                      className="h-16 bg-gray-100 border border-gray-200 rounded"
                    ></div>
                  ))}
                </div>
              </div>

            </div>

            {/* Coming Soon Banner */}
            <div className="bg-[#7ED957] rounded-lg shadow p-12 mt-10 text-center">
              <p className="text-3xl font-bold text-white select-none">
                Stay tuned, More is coming
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;