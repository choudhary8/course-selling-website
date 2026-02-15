import './App.css'
import { Signup } from './components/Signup'
import { Login } from './components/Login'
import { CoursesList } from './components/AllCourses'
import { CourseCreation } from './components/Course-creation'
import { PurchasedCourses } from './components/PurchsedCourses'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreatedCourses } from './components/CreatedCourses'
import { Layout } from './components/Layout'
import { Toaster } from 'react-hot-toast'
import { LessonList } from './components/LessonList'
import { LessonUpload } from './components/LessonUpload'
import { LessonVideo } from './components/LessonVideo'
import { EditCourse } from './components/EditCourse'

function App() {
  alert('First request may take time as backend hosted on render.')
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/' element={<Login/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route element={<Layout/>}>
        <Route path='home' element={<CoursesList/>}/>
        <Route path='create-course' element={<CourseCreation/>}/>
        <Route path='purchased-course' element={<PurchasedCourses/>} />
        <Route path='created-courses' element={<CreatedCourses/>} />
        <Route path='lessons-list' element={<LessonList/>} />
        <Route path='lesson-upload' element={<LessonUpload/>}></Route>
        <Route path='lesson-video' element={<LessonVideo/>}></Route>
        <Route path='edit-course' element={<EditCourse/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    <Toaster position='top-right' reverseOrder={false}/>
    </>
  )
}

export default App
