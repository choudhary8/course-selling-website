import axios from "axios";
import { BASE_URL } from "../utils/constants";
import type { Icourse } from "../utils/interfaces";
import { errorHandler } from "../utils/errorHandler";

export const getApiTrigger = async (route: string) => {
  try {
    const token = localStorage.getItem("authToken");
    const res = await axios.get<{ data: { courses: Icourse[] } }>(
      `${BASE_URL}${route}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const courses = res.data.data.courses;
    console.log(res);
    return courses;
  } catch (error) {
    errorHandler(error,'Api failed');
  }
};
