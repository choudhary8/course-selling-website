import './App.css'
import { Signup } from './components/Signup'
import { Login } from './components/Login'
import { CoursesList } from './components/AllCourses'
import { CourseCreation } from './components/Course-creation'
import { PurchasedCourses } from './components/PurchsedCourses'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreatedCourses } from './components/CreatedCourses'
import { Layout } from './components/Layout'

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/' element={<Login/>}/>
      <Route element={<Layout/>}>
        <Route path='home' element={<CoursesList/>}/>
        <Route path='create-course' element={<CourseCreation/>}/>
        <Route path='purchased-course' element={<PurchasedCourses/>} />
        <Route path='created-courses' element={<CreatedCourses/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
