import React, { useState, useEffect, useContext } from 'react';
import Register from './Register';
import { UserContext } from '../../context/userContext';
import { useHistory } from 'react-router-dom';
import {
  LogInWrapper,
  LogInHeader,
  ErrorMessage,
  LogInFooter,
  LogInLeft,
  LogInBody,
  LogInButton,
  H1,
  Text,
  ButtonContainer,
} from '../styles';
import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

type Props = {
  setCurrentView: Function;
  setUserRegion: Function;
  setStart: Function;
};

const Login = ({ setCurrentView, setUserRegion, setStart }: Props) => {
  const { name, storeName, email, storeEmail } = useContext(UserContext);
  
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [emailLog, setEmailLog] = useState('');
  const [passLog, setPassLog] = useState('');
  const [userArn, setUserArn] = useState('1');
  const [userExternalId, setUserExternalId] = useState('1');
  const [loginOrRegister, setLoginOrRegister] = useState('login');
  const [message, setMessage] = useState('');

  let history = useHistory();

  const onSubmit = async (data: FormData) => {

    const body = JSON.stringify({
      email: emailLog,
      password: passLog,
    });

    const register = await fetch('/api/user/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
      body,
    });

    const response = await register.json();
    const arn = response.arn;
    const externalId = response.externalId;
    const region = response.region;
    const name = response.name;

    if (response.success === true) {
      storeName(name);
      setUserRegion({ region });
      console.log('redirecting...');
      setCurrentView('dashboard');
      setStart(true);
      history.push('/home');
    } else {
      console.log('unsucessful');
      setMessage('Email not registered');
    }
  };

  const regBtnHandler = () => {
    setLoginOrRegister('register');
  };

  return (
    <>
      <LogInWrapper>
        {loginOrRegister === 'login' ? (
          <div id="login">
            <h1>Sign In to Accumulus</h1>
            <br />

            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  {...register('email', {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  type="text"
                  onChange={(e) => {
                    setEmailLog(e.target.value);
                  }}
                />
                <ErrorMessage>
                  {errors.email && (
                    <div className="errors"> Enter a valid email address</div>
                  )}
                </ErrorMessage>
              </div>
              <div>
                <label>Password</label>
                <input
                  {...register('password', { required: true })}
                  type="password"
                  onChange={(e) => {
                    setPassLog(e.target.value);
                  }}
                />
                <ErrorMessage>
                  {errors.password && (
                    <div className="errors"> Enter your password</div>
                  )}
                </ErrorMessage>
              </div>
              <button type="submit"> Log In</button>
              <button onClick={regBtnHandler}>Register</button>
            </form>
          </div>
        ) : (
          <Register
            setLoginOrRegister={setLoginOrRegister}
            setCurrentView={setCurrentView}
            setStart={setStart}
            setUserRegion={setUserRegion}
          />
        )}
      </LogInWrapper>
    </>
  );
};

export default Login;
