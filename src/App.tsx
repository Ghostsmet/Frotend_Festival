import React from 'react';
import './App.css';  
import Header from './Components/Header/Header';  
import Main from './Page/PageMain/Main/Main'; 
import AboutUs from './Page/PageMain/AboutUs/AboutUs';
import Festivals from './Page/PageMain/Festivals/Festivals';
import AboutTheContest from './Page/PageMain/AboutTheContest/AboutTheContest';
import Jury from './Page/PageMain/Jury/Jury';
import Maps from './Components/Maps/Maps';  
import Authorization from './Page/PageAuthorization1/Authorization';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authorization2 from './Page/PageAuthorization2/Authorization2';
import NewPassword from './Page/PageAuthorization3/NewPassword';
import AboutCompetition from './Page/AboutCompetition/AboutCompetition';
import RegistrationForTheContest from './Page/RegistrationForTheContest/RegistrationForTheContest';
import Contacts from './Page/Contacts/Contacts';
import Pologenie from './Page/Pologenie/Pologenie';
import Account from './Page/Account/Account';
import { FestivalsProvider } from './Page/PageMain/Festivals/FestivalsContext';
import AddFestival from './Page/PageMain/Festivals/AddFestival';
import ParticipantsList from './Page/PageMain/Festivals/ParticipantsList';
import { AuthProvider } from './Page/PageMain/Festivals/AuthContext';  // ← путь к существующему файлу
import { ChatProvider } from './Components/Chat/ChatContext';
import ChatWidget from './Components/Chat/ChatWidget';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <FestivalsProvider>
        <ChatProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <div className="App">
                  <Header />    
                  <Main />       
                  <AboutUs/>
                  <Festivals />
                  <AboutTheContest/>
                  <Jury/>
                  <Maps/>
                </div>
              } />
              <Route path="/Authorization" element={<Authorization />} />
              <Route path="/Authorization2" element={<Authorization2 />} />
              <Route path="/new-password" element={<NewPassword />} />
              <Route path="/about-competition" element={<AboutCompetition />} />
              <Route path="/RegistrationForTheContest" element={<RegistrationForTheContest />} />
              <Route path="/Contacts" element={<Contacts />} />
              <Route path="/Pologenie" element={<Pologenie />} />
              <Route path="/account" element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } />
              <Route path="/add-festival" element={
                <ProtectedRoute requireAdmin={true}>
                  <AddFestival />
                </ProtectedRoute>
              } />
              <Route path="/participants/:id" element={
                <ProtectedRoute requireAdmin={true}>
                  <ParticipantsList />
                </ProtectedRoute>
              } />
            </Routes>
            <ChatWidget />
          </BrowserRouter>
        </ChatProvider>
      </FestivalsProvider>
    </AuthProvider>
  );
}

export default App;