import { useCallback} from "react"
import { BASE_URL } from "../utils/constants";
import { FaGraduationCap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Signup=()=>{

    // interface IFormData{
    //     firstName:string,
    //     lastName:string,
    //     email:string,
    //     password:string
    // }

    const navigate=useNavigate();
    const handleSubmit:React.FormEventHandler<HTMLFormElement>=useCallback(async(event)=>{
        try {
            const formData=new FormData(event.currentTarget);
            event.preventDefault();
            const res=await fetch(`${BASE_URL}/users/signup`,
                {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                      },
                    body:JSON.stringify({
                    firstName:`${formData.get('firstName')}`,
                    lastName:`${formData.get('lastName')}`,
                    email:`${formData.get('email')}`,
                    password:`${formData.get('password')}`,
            }),}
            )
            const data=await res.json();
            navigate('/');
            console.log(data);
        } catch (error) {
            console.log(error);
            
        }
    },[])
    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} action="" className="flex flex-col w-[29%] p-10 rounded-2xl shadow-xl bg-gray-800">
                <div className="flex justify-center items-center font-bold text-xl"><FaGraduationCap className="text-4xl mx-2"/> CourseHub</div>
                <div className="text-center text-xl p-4">Welcome to CourseHub</div>

                <label htmlFor="firstName">First name</label>
                <input type="text" id="firstName" name="firstName" placeholder="Enter Your First Name" />

                <label htmlFor="lastName">Last name</label>
                <input type="text" name="lastName" placeholder="Enter Your Last Name" />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter Your Email" required/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter Your Password" required/>

                <div>
                    <span>Already have account? </span>
                    <a href="./" className="text-blue-500 hover:text-blue-600">Login</a>
                </div>

                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-3 mt-5 rounded-lg cursor-pointer">Sign up</button>
            </form>
        </div>
    )
}