// import { useCoursesList} from "../hooks/useAllCourses";
import { useApi } from "../hooks/useGetApi";
import type { Icourse } from "../utils/interfaces";
import { Course } from "./Course";

export const CoursesList = () => {
  const courses: Icourse[] = useApi("/users/courses");
  
  return (
    <div className="md:mx-30 mx-2 sm:mx-8">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 items-start">
        {courses.map((course) => (
          <Course
            courseId={course._id}
            key={course._id}
            imgUrl={course.imageUrl}
            courseCategory={course.category}
            courseName={course.title}
            courseDesc={course.description}
            author={
              course.creator.firstName +
              " " +
              (course.creator.lastName != undefined
                ? course.creator.lastName
                : "")
            }
            price={course.price} 
            buy={true}
          />
        ))}
      </div>
    </div>
  );
};
