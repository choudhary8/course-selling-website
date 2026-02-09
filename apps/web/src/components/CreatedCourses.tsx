// import { useCreatedCourses } from "../hooks/useCreatedCourses";
import { useGetApi } from "../hooks/useGetApi";
import type { Icourse } from "../utils/interfaces";
import { Course } from "./Course";

export const CreatedCourses = () => {
  const createdCourses:Icourse[] = useGetApi("/admin/created-courses");
  return (
    <div className="md:mx-30 mx-2 sm:mx-8">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 items-start">
        {createdCourses.map((course) => (
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
            buy={false}
          />
        ))}
      </div>
    </div>
  );
};
