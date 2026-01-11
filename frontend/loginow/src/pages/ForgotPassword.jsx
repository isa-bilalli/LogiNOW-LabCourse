import {Link} from "react-router-dom";

function ForgotPassword() {
    return(
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('/src/assets/page-background-shapes.png')"}}>
        <div className="bg-[#F0F0F0] pl-6 pr-6 pt-3 flex flex-col rounded-xl border border-[#7ED957] items-center">
            <h2 className="font-bold text-2xl">Contact Support!</h2>
            <p className="mb-4">We are glad to help</p>
            <p>+381 (0) 62 177 548</p>
            <p className="mt-1">+383 (0) 48 555 666</p>
            <p className="mt-1">+383 (0) 48 185 742</p>
            <Link to="/login" className="text-sm text-[#7ED957] hover:underline font-semibold mt-8 mb-6 px-2">Go Back</Link>
        </div>
    </div>
    )
}

export default ForgotPassword;