import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    
    return(
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col justify-center items-center bg-[#d9d9d9] p-10 rounded-2xl">
                <p className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">📦</p>
                <h1 className="text-4xl font-semibold">Oops!</h1>
                <p className="text-2xl">Something went wrong.</p>
                <p className="text-2xl"><i>{error?.statusText || error?.message}</i></p>
            </div>
        </div>
    );
}

export default ErrorPage;