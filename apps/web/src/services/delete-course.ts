import { BASE_URL } from "../utils/constants"
import { errorHandler } from "../utils/errorHandler";

export const deleteCourse=async({courseId}:{courseId:string})=>{
    try {
        const auth_token=localStorage.getItem('auth_token');
        const res=await axios.delete<{message:string}>(`${BASE_URL}/courses/course-delete/${courseId}`,{
            headers:{
                Authorization: `Bearer ${auth_token}`,
                "Content-Type": "multipart/form-data"
            }
        }
    )
    if(res?.data?.message!=="Course deleted successfully")
        errorHandler("something went wrong")
    } catch (error) {
        errorHandler(error,'Api failed');
    }
}