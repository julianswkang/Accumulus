import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';



const RegForm: React.FunctionComponent = () => {
  
  const router = useRouter();
  const [nameReg, setNameReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [arnReg, setArnReg] = useState('');
  const [regionReg, setRegionReg] = useState('us-east-2');

  const [EXTERNAL_ID, setexternelid] = useState(uuidv4());

  useEffect(() => {
    setexternelid(uuidv4());
  }, []);

  const YML = `https://accumulus.s3.us-east-2.amazonaws.com/cloudformation.yml`;

  const regBtnHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;

    const body = JSON.stringify({
      name: nameReg,
      email: emailReg,
      password: passwordReg,
      arn: arnReg,
      region: regionReg,
      externalId: EXTERNAL_ID,
    });

    console.log(EXTERNAL_ID);

    const register = await fetch('http://localhost:3000/api/user/signup', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body,
    });
    console.log(register);

    if (register.status === 200) {
      console.log('redirecting...');
      router.push('/dashboard');
    } else {
      console.log('unsuccessful');
    }
  };

  return (
    <>
      <div id='registration'>
        <h3>Welcome to the Registration Page</h3>
        <a
          href={`https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=accumulus-delegation&param_ExternalId=${EXTERNAL_ID}&templateURL=${YML}`}
          target="_blank"
        >
          Please visit this link to get your ARN
        </a>

        <form className='registration-form'>
          <input
            type='text'
            placeholder='Name'
            onChange={(e) => {
              setNameReg(e.target.value);
            }}
            required
          />
          <input
            type='text'
            placeholder='Email'
            onChange={(e) => {
              setEmailReg(e.target.value);
            }}
            required
          />
          <input
            type='password'
            placeholder='Password'
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
            required
          />
          <input
            type='text'
            placeholder='ARN'
            onChange={(e) => {
              setArnReg(e.target.value);
            }}
            required
          />
          {/* <input type="text" placeholder="Region"
            onChange={(e) => {
              setRegionReg(e.target.value)
            }}
          /> */}
          <label htmlFor='region'>Choose a region:</label>
          <select
            required
            id='region'
            name='region'
            onChange={(e) => {
              setRegionReg(e.target.value);
            }}
          >
            <option value='us-east-2'>US East (Ohio)</option>
            <option value='us-east-1'>US East (N. Virginia)</option>
            <option value='us-west-1'>US West (N. California)</option>
            <option value='us-west-2'>US West (Oregon)</option>
          </select>
        </form>
        <button onClick={regBtnHandler}>Sign me up NOW!</button>
      </div>
    </>
  );
};

export default RegForm;
