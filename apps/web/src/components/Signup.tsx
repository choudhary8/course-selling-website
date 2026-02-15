import { useCallback, useState} from "react"
import { BASE_URL } from "../utils/constants";
import { FaGraduationCap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../utils/errorHandler";
import toast from "react-hot-toast";
import axios from "axios";

export const Signup=()=>{

    // interface IFormData{
    //     firstName:string,
    //     lastName:string,
    //     email:string,
    //     password:string
    // }

    const navigate=useNavigate();
    const [loading,setLoading]=useState<boolean>(false);
    const handleSubmit:React.FormEventHandler<HTMLFormElement>=useCallback(async(event)=>{
        try {
            event.preventDefault();
            setLoading(true);
            const formData=new FormData(event.currentTarget);
            const res=await axios.post(`${BASE_URL}/users/signup`,
                {
                    firstName:formData.get('firstName'),
                    lastName:formData.get('lastName'),
                    email:formData.get('email'),
                    password:formData.get('password'),
            }
            )
            const data=res.data;
            navigate('/');
            console.log(data);
        } catch (error) {
            const message=errorHandler(error,'Api failed');
            if(message.includes('User already exist')){
                toast.error('User already exist');
             }
             else {
                 toast.error(message);
             }
        }finally{
            setLoading(false);
        }
    },[])
    if(loading){
        return <div className="flex flex-col items-center justify-center flex-1 h-dvh"><div className="loader"></div></div>
      }
    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} action="" className="flex flex-col w-full sm:w-[29%] p-10 rounded-2xl sm:bg-gray-800">
                <div className="flex justify-center items-center font-bold text-xl"><FaGraduationCap className="text-4xl mx-2"/> CourseHub</div>
                <div className="text-center text-xl p-4">Welcome to CourseHub</div>

                <label htmlFor="firstName">First name</label>
                <input type="text" id="firstName" name="firstName" placeholder="Enter Your First Name" required/>

                <label htmlFor="lastName">Last name</label>
                <input type="text" name="lastName" placeholder="Enter Your Last Name" />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter Your Email" required/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter Your Password" required/>

                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-3 mt-3 rounded-lg cursor-pointer">Sign up</button>
                <div className="flex mt-2">
                    <span>Already have account? </span>
                    <div onClick={()=>{navigate('/login')}} className="text-blue-500 hover:text-blue-600 pl-1">Login</div>
                </div>
            </form>
        </div>
    )
}