import axios from "axios";
import { useCallback} from "react"
import { BASE_URL } from "../utils/constants";
import { FaGraduationCap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


interface Iuser{
    _id:string,
    firstName:string,
    lastName:string,
    email:string,
    purchasedCourses:string[]
}

interface Ires{
    data:Iuser,
    token:string
}

export const Login=()=>{
    const navigate=useNavigate();
    const handleSubmit:React.FormEventHandler<HTMLFormElement>=useCallback(async(event)=>{
        try {
            event.preventDefault();
            const formData=new FormData(event.currentTarget);
            const res=await axios.post<{data:Ires}>(`${BASE_URL}/users/login`,{
                email:formData.get('email'),
                password:formData.get('password')
            })
            
            localStorage.setItem('authToken',res.data.data.token)
            navigate('/home',{replace:true});
            
        } catch (error) {
            console.log(error);
            
        }
    },[])
    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} action="" className="flex flex-col w-[28%] p-10 rounded-2xl shadow-xl bg-gray-800">
                <div className="flex justify-center items-center font-bold text-xl"><FaGraduationCap className="text-4xl mx-2"/> CourseHub</div>
                <div className="text-center text-xl p-4">Login to your account</div>

                <label htmlFor="email">Email</label>
                <input  name="email" id="email" placeholder="Enter your email" required/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter your password" required/>

                <div className="flex justify-between">
                    <a href="" className="text-blue-500 hover:text-blue-600">Forget password? </a> 
                    <a href="./Signup" className="text-blue-500 hover:text-blue-600">Sign up</a>
                </div>

                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-3 mt-5 rounded-lg cursor-pointer">Login</button>
            </form>
        </div>
    )
}