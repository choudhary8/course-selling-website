import { useCallback} from "react"
import { LuUser } from "react-icons/lu"
import { purchaseCourse } from "../services/purchaseCourse"

export interface Iparams{
    courseId:string,
    imgUrl?:string,
    courseCategory:string,
    courseName:string,
    courseDesc:string,
    author:string,
    price:number
}

export const Course=({courseId,imgUrl,courseCategory="course",courseName,courseDesc, author, price}:Iparams)=>{
    const buyCourse=useCallback(async()=>{
        try {
         const res=await purchaseCourse(courseId);
         console.log(res);
         
         if(res){
             alert('bought')
         }
        } catch (error) {
         console.log(error);
         alert(error.response.data.message)
         
        }
     },[])
    return <div className="rounded-2xl shadow-xl bg-gray-800 overflow-hidden">
        <div>
            {imgUrl&&<img src={imgUrl} alt="courseImage" className="w-full h-60"/>}
        </div>
        <div className="p-6 ">
            
            <div >
                <span className="bg-gray-700 rounded-xl shadow-xl p-1 px-2 text-sm">{courseCategory}</span>
            </div>
            <div className="font-bold text-xl py-3">{courseName}</div>
            <div>{courseDesc}</div>
            <div className="flex items-center font-semibold py-2"><LuUser className="mx-1"/>{author}</div>
            <div className="text-blue-500 hover:text-blue-600">${price}</div>
            <button onClick={buyCourse} className="hover:bg-blue-800 text-blue-600 hover:text-white border-black p-3 mt-2 rounded-lg cursor-pointer w-full">Buy</button>
        </div>
    </div>
}