import {Link} from "react-router-dom";  

function Register() {
  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('/src/assets/page-background-shapes.png')"}}>
      <form className="bg-[#F0F0F0] pl-6 pr-6 pt-3 flex flex-col rounded-xl border border-[#7ED957] items-center">
        <img src="/src/assets/LogiNOW_WHITE-removebg-preview.png" className="self-center w-48 pt-1 pointer-events-none select-none" alt="Logo"/>
        <input type="text" placeholder="Username" className="bg-white border-2 border-[#7ED957] rounded-xl p-2 pl-4 mt-6 w-75 focus:outline-none" />
        <input type="email" placeholder="E-Mail" className="bg-white border-2 border-[#7ED957] rounded-xl p-2 pl-4 mt-6 w-75 focus:outline-none"/>
        <input type="password" placeholder="Password" className="bg-white border-2 border-[#7ED957] rounded-xl p-2 pl-4 mt-6 w-75 focus:outline-none"/>
        <input type="password" placeholder="Confirm Password" className="bg-white border-2 border-[#7ED957] rounded-xl p-2 pl-4 mt-6 w-75 focus:outline-none"/>
        <button type="submit" className="bg-[#7ED957] mt-10 text-white w-50 rounded-xl h-10 cursor-pointer font-thin tracking-wider">Register</button>
        <Link to="/login" className="text-sm text-[#7ED957] hover:underline font-semibold mt-8 mb-6 px-2">Have An Account?</Link>
      </form>
    </div>
  );
}

export default Register;