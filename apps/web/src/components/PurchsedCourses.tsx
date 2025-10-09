import { usePurchasedCourses } from "../hooks/usePurchasedCourses";
import { Course } from "./Course";

export const PurchasedCourses = () => {
  const courses= usePurchasedCourses();
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
          />
        ))}
      </div>
    </div>
  );
};
