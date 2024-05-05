import React from "react"
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import store from "./redux/store"


const rrfConfig = {
  userProfile: "users",
}


const rrfProps = {
  config: rrfConfig,
  dispatch: store.dispatch,
}

export default function Providers({children}){
  return (
    <BrowserRouter>
        <Provider store={store}>
            { children }
        </Provider>
    </BrowserRouter>
  )
}