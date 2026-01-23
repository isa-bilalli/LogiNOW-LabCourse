import {Link} from "react-router-dom";  
import {useState} from "react";
import { registerUser } from "../api";

function Register() {

  const [formData, setFormData] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
    phoneNumber:""
  })

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if(formData.password.length < 8){
      setSubmitError("Password must be atleast 8 characters long");
      return
    }
    if(formData.password !== formData.confirmPassword){
      setSubmitError("Passwords do not match");
      return
    }
    
    const res = await registerUser(formData);

    if(!res.ok){
      setSubmitError(res.error);
      return;
    }

    setSubmitSuccess("Registration Successful! Please log in.");
  }

  const handleChange = (e) =>{
    const {name, value} = e.target
    setFormData((prev) =>({
      ...prev,
      [name]:value,
    }));
  }


  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('/src/assets/page-background-shapes.png')"}}>
      <form className="bg-[#F0F0F0] pl-6 pr-6 pt-3 flex flex-col rounded-xl border border-[#7ED957] items-center" onSubmit={handleSubmit}>
        <img src="/src/assets/LogiNOW_WHITE-removebg-preview.png" className="self-center w-48 pt-1 pointer-events-none select-none" alt="Logo"/>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="bg-white border-2 border-[#7ED957] rounded-xl p-2 pl-4 mt-6 w-75 focus:outline-none"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-Mail"
          className="bg-white border-2 border-[#7ED957] rounded-xl p-2 pl-4 mt-6 w-75 focus:outline-none"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="bg-white border-2 border-[#7ED957] rounded-xl p-2 pl-4 mt-6 w-75 focus:outline-none"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="bg-white border-2 border-[#7ED957] rounded-xl p-2 pl-4 mt-6 w-75 focus:outline-none"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone number"
          className="bg-white border-2 border-[#7ED957] rounded-xl p-2 pl-4 mt-6 w-75 focus:outline-none"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <div className="text-center">
        {submitError && (
          <p className="text-red-500 mt-4 self-start font-semibold select-none">
            {submitError}
          </p>
        )}

        {submitSuccess && (
          <p className="text-green-600 mt-4 self-start font-semibold select-none">
            {submitSuccess}
          </p>
        )}
        </div>
        <button type="submit" className="bg-[#7ED957] mt-10 text-white w-50 rounded-xl h-10 cursor-pointer font-thin tracking-wider">Register</button>
        <Link to="/login" className="text-sm text-[#7ED957] hover:underline font-semibold mt-8 mb-6 px-2">Have An Account?</Link>
      </form>
    </div>
  );
}

export default Register;