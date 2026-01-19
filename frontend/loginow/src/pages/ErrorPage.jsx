import { useRouteError } from "react-router-dom";
import logo from "../assets/LogiNOW_WHITE-removebg-preview.png";

function ErrorPage() {
    const error = useRouteError();
    
    return(
        <div className="min-h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('/src/assets/page-background-shapes.png')"}}>
            <div className="flex flex-col justify-center items-center bg-[#F0F0F0] p-10 rounded-2xl text-center border-[#7ED957] border-2">
                <img src={logo} className="w-60 select-none pointer-events-none"/>
                <h1 className="text-2xl">Oops!</h1>
                <p className="text-2xl">Something went wrong.<br/> Error:</p>
                <p className="text-2xl font-bold"><i>{error?.statusText || error?.message}</i></p>
            </div>
        </div>
    );
}

export default ErrorPage;