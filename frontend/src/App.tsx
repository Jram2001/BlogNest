import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthenticationPage from './pages/authentication'
import BlogEditor from './pages/create-blog'
import Home from './pages/home'
import { BlogPreviewWrapper } from './pages/view-blogs'
import Profile from './pages/profile'
import { SnackbarProvider } from './context/snackbar-context'
import { SnackBar } from './util/ui/snackbar'
import { RouterWrapper } from './components/router-wrapper'
import AuthGuard from './guard/auth-guard'
import { AuthProvider } from './guard/auth-provider'

function App() {

  return (
    <>
      <SnackbarProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AuthenticationPage />} />
            <Route path="/dashboard" element={<RouterWrapper />} >
              <Route path="home" element={<AuthGuard> <Home /> </AuthGuard>} />
              <Route path="viewblog/:id" element={<AuthGuard> <BlogPreviewWrapper /> </AuthGuard>} />
              <Route path="create" element={<AuthGuard><BlogEditor /> </AuthGuard>} />
              <Route path="create/:id" element={<AuthGuard><BlogEditor /> </AuthGuard>} />
              <Route path="profile" element={<AuthGuard><Profile /> </AuthGuard>} />
            </Route>
          </Routes>
        </AuthProvider >
        <SnackBar />
      </SnackbarProvider >
      {/* <BlogEditor /> */}
      {/* <BlogListing /> */}
    </>
  )
}

export default App
