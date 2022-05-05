import react from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import myTheme from '../styles/globals'


export const StartedButton = styled.button`
position: fixed;
top: 0;
right: 0;
margin: 60px;
width: 120px;
height: 40px;
border-radius: 7px;
background-color: #eae6f0;
color: white;
font-weight: 500;


&:hover {
  background-color: #00E6FF;
}

`;


//---------------------LOGIN PAGE------
export const LogInWrapper = styled.section`
  border: 1px solid black;
  width: 400px;
  height: 450px;
  border-radius: 7px;
  margin: auto;
  margin-top: 130px;
  display: flex;
  flex-direction: column;
  background-color: #C7FAFF;
  align-items: center;
  justify-content: center;
  text-align: center;

  
`;

export const LogInHeader = styled.section`
  width: 100vw;
  top: 0;
  left: 0;
  background-color: white;
  text-align: center;
  
`;
export const LogInBody = styled.section`
  width: 100vw;
  height: 80vh;
  left: 0;
`;
export const H1 = styled.h1`
font-size: 4em;
width: 600px;
padding-left: 30px;
`;
export const Text = styled.section`
  width: 400px;
  border: 1px solid white;
  padding: 20px;
  margin: 20px;
  font-size: 1.4em;
`;

export const LogInFooter = styled.section`
  width: 100vw;
  height: auto;
  padding-left: 20px;
  padding-bottom:  100px;
  bottom: 0;
  left: 0;
  background-color: #eae6f0;



`;

export const LogInLeft = styled.section`
  align-self: flex-start; 
`;

export const LogInButton = styled.button`
width: auto;
height: 30px;
border-radius: 7px;
background-color: #eae6f0;
color: white;
font-weight: 500;

&:hover {
  background-color: #00E6FF;
}

`;

export const ButtonContainer = styled.section`
position: relative
right: 0;
top: 5;
`;

// const {
//   default: styled,
//   css,
//   ThemeProvider
// } = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<ThemeInterface>;

// export const Button = styled.button`
//   width: 200px;
//   height: 50px;
//   background-color: ${(props) => props.backgroundColor ? props.backgroundColor : '#ffffff'};
// `;

//------------------Registration-----------------------------
export const RegistrationWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  text-align: center;



`;

//------------------DASHBOARD-----------------------------
export const DashboardWrapper = styled.section`
  margin-left: 12%;
`;

// export const DashboardGrid = styled.section`
//   display: grid, inline-grid;
//   grid-template-columns:
//     repeat(3, 1fr)
//     auto;
//   grid-template-rows: auto;
//   gap: 20px;
//   background-color: #c4e1e3;
// `;

export const GraphContainer = styled.section`
  background: #eae6f0;
  /* padding: 0.25rem; */
  width: 100%;
  height: 85%;
`;

// grid-column: ${props => props.gridColumn};
// grid-row: ${(props: Props) => props.gridRow};

// export { css, ThemeProvider };
// export default styled;

export const DashboardGrid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 0.3fr 0.75fr 0.75fr 0.75fr;
  grid-template-rows: 0.2fr 0.75fr 0.75fr 0.1fr;
  grid-template-areas:
    'sidebar nav nav nav'
    'sidebar content content content'
    'sidebar content1 content1 content1'
    'footer footer footer footer';
  text-align: center;
  grid-gap: 0.25rem;
  transition: all 0.25s ease-in-out;
  color: white;
`;
export const Header = styled.nav`
  display: flex;
  align-items: center;
  background: white;
  color: #232323;
  grid-area: nav;
  padding: 0.25rem;
  font-family: 'Roboto', sans-serif;
  font-size: 38px;
  padding: 20px;
`;

export const DashSideBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #232323;
  grid-area: sidebar;
  padding: 0.25rem;
`;

export const EvenDashGraphBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.85rem;
  padding: 0.25rem;
  align-items: center;
  grid-area: content;
  justify-content: center;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const LongDashBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0.85rem;
  padding: 0.25rem;
  align-items: center;
  grid-area: content1;
  justify-content: center;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const Content1 = styled.div`
  background: #a6b8b9;
  /* padding: 0.25rem; */
  width: 100%;
  height: 100%;
`;
const Content2 = styled(Content1)``;
const Content3 = styled(Content1)``;
const Footer = styled.footer`
  background: #ff9637;
  grid-area: footer;
  padding: 0.25rem;
`;

//--------------------SIDEBAR-------------------------
export const BasicBtn = styled.button`
  height: 70px;
  width: 170px;
  margin: 0.5rem;
  border-radius: 5px;
  padding: 12px 26px;
  font-size: 20px;
  outline: none;
  background: #232323;
  text-color: white;
  color: white;
  border: 1px solid #232323;
  cursor: pointer;
`;
