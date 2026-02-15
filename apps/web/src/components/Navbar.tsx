import { useEffect, useRef, useState } from "react"
import { FaGraduationCap } from "react-icons/fa"
import { FaCircleUser } from "react-icons/fa6"
import { MdOutlineLogout } from "react-icons/md"
import { NavLink, useNavigate } from "react-router-dom"

export const Navbar=()=>{
    const navigate=useNavigate();
    const profileRef=useRef<HTMLDivElement|null>(null)
    const [showProfile,setShowProfile]=useState<boolean>(false)
    useEffect(()=>{
        const handleOutsideClick=(event:MouseEvent)=>{
            if(profileRef.current&&!profileRef.current.contains(event.target as Node)){
                setShowProfile(false);
            }
        }
            document.addEventListener('mousedown',handleOutsideClick);
            return ()=>{
                document.removeEventListener('mousedown',handleOutsideClick);
            }
    },[])
    return (
        <nav className="flex justify-between sm:px-12 py-3 bg-gray-900 items-center sticky top-0">
            <div className="flex items-center">
                <NavLink to='/home' className='flex items-center font-bold text-2xl text-blue-600 px-4 gap-1'><FaGraduationCap/> CourseHub</NavLink>
                <NavLink to='/home' className={({isActive})=>isActive?'text-blue-600 text-600 sm:px-6 md:px-14 hidden sm:inline':'md:px-14 sm:px-6 hidden sm:inline'}>Courses</NavLink>
                <NavLink to='/purchased-course' className={({isActive})=>isActive?'text-blue-600 text-600 md:px-14 sm:px-6 hidden sm:inline':'md:px-14 sm:px-6 hidden sm:inline'}>Purchses</NavLink>
            </div>
            <div className="flex items-center">
                <NavLink to='/create-course'>
                    <button className="bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-2 rounded-lg cursor-pointer">Create Course</button>
                </NavLink>
                <div className="px-4 sm:px-8">
                    <div onClick={()=>{setShowProfile(!showProfile)}} className=""><FaCircleUser className="text-blue-700 text-4xl cursor-pointer"/></div>
                    {showProfile&&<div ref={profileRef} className="absolute right-20 bg-gray-800 p-1 top-15 border-[0.5px] border-gray-600 rounded-lg  shadow-xl">
                        <div className="cursor-pointer hover:bg-gray-700 p-1 flex items-center gap-2 rounded-sm"><FaCircleUser/><div>Profile</div></div>
                        <NavLink to='/created-courses' className="cursor-pointer hover:bg-gray-700 p-1 flex items-center gap-2 rounded-sm"><FaGraduationCap/>Created Courses</NavLink>
                        <NavLink to='/home' className={({isActive})=>isActive?'text-blue-600 text-600 p-1 px-7 block sm:hidden':'p-1 px-7 block sm:hidden'}>Courses</NavLink>
                        <NavLink to='/purchased-course' className={({isActive})=>isActive?'text-blue-600 text-600 p-1 px-7 block sm:hidden':'p-1 px-7 block sm:hidden'}>Purchses</NavLink>
                        <div className="cursor-pointer hover:bg-gray-700 p-1 flex items-center gap-2 rounded-sm" onClick={()=>{localStorage.removeItem('authToken');navigate('/login',{replace:true});}}><MdOutlineLogout/> Logout</div>
                    </div>}
                </div>
            </div>
        </nav>
    )
}