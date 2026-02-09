import { useState } from "react"
import { FaGraduationCap } from "react-icons/fa"
import { FaCircleUser } from "react-icons/fa6"
import { MdOutlineLogout } from "react-icons/md"
import { NavLink, useNavigate } from "react-router-dom"

export const Navbar=()=>{
    const navigate=useNavigate();
    const [showProfile,setShowProfile]=useState<boolean>(false)
    return (
        <nav className="flex justify-between px-12 py-3 bg-gray-900 items-center sticky w-full top-0">
            <div className="flex items-center">
                <NavLink to='/home' className='flex items-center font-bold text-2xl text-blue-600 px-4 gap-1'><FaGraduationCap/> CourseHub</NavLink>
                <NavLink to='/home' className={({isActive})=>isActive?'text-blue-600 text-600 px-14':'px-14'}>Courses</NavLink>
                <NavLink to='/purchased-course' className={({isActive})=>isActive?'text-blue-600 text-600 px-14':'px-14'}>Purchses</NavLink>
            </div>
            <div className="flex items-center">
                <NavLink to='/create-course'>
                    <button className="bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-2 rounded-lg cursor-pointer">Create Course</button>
                </NavLink>
                <div className="px-8">
                    <div onClick={()=>{setShowProfile(!showProfile)}} className=""><FaCircleUser className="text-blue-700 text-4xl cursor-pointer"/></div>
                    {showProfile&&<div className="absolute right-4 bg-gray-800 p-1 top-15 border-[0.5px] border-gray-600 rounded-lg  shadow-xl">
                        <div className="cursor-pointer hover:bg-gray-700 p-1 flex items-center gap-2 rounded-sm"><FaCircleUser/><div>Profile</div></div>
                        <NavLink to='/created-courses' className="cursor-pointer hover:bg-gray-700 p-1 flex items-center gap-2 rounded-sm"><FaGraduationCap/>Created Courses</NavLink>
                        <div className="cursor-pointer hover:bg-gray-700 p-1 flex items-center gap-2 rounded-sm" onClick={()=>{localStorage.removeItem('authToken');navigate('/login',{replace:true});}}><MdOutlineLogout/> Logout</div>
                    </div>}
                </div>
            </div>
        </nav>
    )
}