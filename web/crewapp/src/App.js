import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {loadUser} from "./redux/actions/authActions"
import Router from "./pages/Router"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import FullContentSpinner from "./components/spinners/FullContentSpinner"

import "./scss/style.scss"

const App = () => {
  const dispatch = useDispatch()
  const isUserLoading = useSelector(state => state.auth.isUserLoading)

  React.useEffect(() => {dispatch(loadUser())}, [])

  return (

    <>
      { (isUserLoading) ? <FullContentSpinner/> : <Router/> }
      <ToastContainer/>
    </>
    )
}

export default App