import React, { useState, useEffect, Component } from 'react';
import { HashRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Functions from './components/Functions';
import Allocations from './components/Allocations';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import Menu from './components/splash-menu';
import styled from 'styled-components';
import * as fetchHelper from './fetchHelper';

interface IuserData {
  arn: string;
  externalId: string;
  region: string;
}

const App = () => {
  const [userData, setUserData] = useState<IuserData>({
    arn: '',
    externalId: '',
    region: '',
  });

  // --------- ALL FUNCS HOOKS
  // Dashboard
  const [totalInvocations, setTotalInvocations] = useState([]);
  const [totalErrors, setTotalErrors] = useState([]);
  const [totalCost, setTotalCost] = useState([]);

  // --------- BY FUNC HOOKS
  // Dashboard
  const [slowestFuncs, setSlowestFuncs] = useState([]);
  const [mostErroredFuncs, setMostErroredFuncs] = useState([]);
  const [errorMsgs, setErrorMsgs] = useState([]); // unused currently
  // Allocation
  const [memUsedVsAllo, setMemUsedVsAllo] = useState([]);
  // Functions
  const [invocations, setInvocations] = useState([]);
  const [duration, setDuration] = useState([]);
  const [errors, setErrors] = useState([]);
  const [memUsage, setMemUsage] = useState([]);
  const [cost, setCost] = useState([]);
  const [throttles, setThrottles] = useState([]);

  const [currentView, setCurrentView] = useState('login');

  useEffect(() => {
    if (userData.arn !== '') {
      console.log('running fetchMetricAllFunctions');
      fetchHelper.fetchMetricAllFunctions(
        setTotalInvocations,
        setTotalErrors,
        setTotalCost,
        setSlowestFuncs,
        setErrorMsgs,
        setMostErroredFuncs,
        setMemUsedVsAllo,
        setInvocations,
        setDuration,
        setErrors,
        setMemUsage,
        setCost,
        setThrottles
      );
    }
  }, [userData]);

  useEffect(() => {
    console.log(invocations);
    console.log(duration);
    console.log(errors);
    console.log(memUsage);
    console.log(cost);
    console.log(throttles);
  }, [invocations, duration, errors, memUsage, cost, throttles]);

  const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
  `;
  return (
    <HashRouter>
      <div>
        <Wrapper>
          <h1>Welcome to Accumulus!</h1>
        </Wrapper>
        {currentView === 'login' ? (
          <Login setCurrentView={setCurrentView} setUserData={setUserData} />
        ) : (
          <React.Fragment>
            <div>
              <Sidebar />
              <Switch>
                {/* DASHBOARD ROUTE */}
                <Route
                  exact
                  path="/home"
                  render={(props) => (
                    <Dashboard
                      totalInvocations={totalInvocations}
                      totalErrors={totalErrors}
                      totalCost={totalCost}
                      slowestFuncs={slowestFuncs}
                      errorMsgs={errorMsgs}
                      mostErroredFuncs={mostErroredFuncs}
                    />
                  )}
                />

                {/* FUNCTIONS ROUTE */}
                <Route
                  exact
                  path="/functions"
                  render={(props) => (
                    <Functions
                      {...userData}
                      invocations={invocations}
                      duration={duration}
                      errors={errors}
                      memUsage={memUsage}
                      cost={cost}
                      throttles={throttles}
                    />
                  )}
                />

                {/* ALLOCATIONS ROUTE */}
                <Route
                  exact
                  path="/allocations"
                  render={(props) => (
                    <Allocations {...userData} memUsedVsAllo={memUsedVsAllo} />
                  )}
                />
              </Switch>
            </div>
          </React.Fragment>
        )}
      </div>
    </HashRouter>
  );
};

export default App;
