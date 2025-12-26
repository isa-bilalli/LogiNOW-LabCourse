import { useState } from 'react';

function LandingPage() {
    const [count, setCount] = useState(0);
    return ( 
    <>
        <p className="font-bold">You're in the landing page</p>
        <button className="text-white bg-black" onClick={() => setCount(count+1)}>Click me</button>
        <p className="text-red-500">Count: {count}</p>
    </>
  )
}

export default LandingPage;