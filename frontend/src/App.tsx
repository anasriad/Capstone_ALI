
import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import RestaurantPage from './pages/FoodOrder'
function App() {

  const LandingPage = lazy(() => import('../src/pages/LandingPage'))
  return (
    <>
      <Suspense>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/food' element={<RestaurantPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
