import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { BuilderPage } from './pages/BuilderPage.jsx';
import { BookingPage } from './pages/BookingPage.jsx';
import { TrackJobPage } from './pages/TrackJobPage.jsx';
import { AdminPage } from './pages/AdminPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/track" element={<TrackJobPage />} />
          <Route path="/track/:code" element={<TrackJobPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
