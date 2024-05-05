import React, { useCallback, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow
} from '@coreui/react'
import { useDispatch, useSelector } from "react-redux"
import MiniSpinner from "../../components/spinners/MiniSpinner"
import { login } from "../../redux/actions/authActions"
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const [email, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = useCallback(() => {
    dispatch(login(email, password, redirectToMainWhenLogin))
  }, [email, password, navigate])

  const redirectToMainWhenLogin = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <div className="c-app c-default-layout d-flex align-items-center justify-content-center vh-100">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Username"
                        autoComplete="email"
                        value={email}
                        onChange={e => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={onLogin}>
                          {auth.isLoginLoading ? <MiniSpinner /> : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                      <CCol md={12} className="text-danger mt-3">
                        {auth.error}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div className="mt-5">
                    <h2>Crew Control System</h2>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default LoginPage
