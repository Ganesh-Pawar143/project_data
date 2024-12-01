import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
//import ViewBooking from './components/ViewBooking';
import LandingPage from './components/LandingPage';
import VendorLayout from './components/vendor/VendorLayout';
import VendorAvailableBookings from './components/vendor/VendorAvailableBookings';
import VendorAcceptedBookings from './components/vendor/VendorAcceptedBookings';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function CustomerLayout() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Booking System</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
            <div className="navbar-nav">
              <Link className="nav-link" to="/" onClick={() => setIsNavCollapsed(true)}>New Booking</Link>
              <Link className="nav-link" to="/bookings" onClick={() => setIsNavCollapsed(true)}>View Bookings</Link>
              <Link className="nav-link" to="/landing" onClick={() => setIsNavCollapsed(true)}>Switch Portal</Link>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<BookingForm />} />
          <Route path="bookings" element={<BookingList />} />
          {/* <Route path="bookings/:id" element={<ViewBooking />} /> */}
        </Route>

        <Route path="/vendor" element={<VendorLayout />}>
          <Route index element={<VendorAvailableBookings />} />
          <Route path="accepted" element={<VendorAcceptedBookings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import BookingForm from './components/BookingForm';
// import BookingList from './components/BookingList';
// import LandingPage from './components/LandingPage';
// import VendorLayout from './components/vendor/VendorLayout';
// import VendorAvailableBookings from './components/vendor/VendorAvailableBookings';
// import VendorAcceptedBookings from './components/vendor/VendorAcceptedBookings';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState } from 'react';

// function App() {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(true);

//   return (
//     <Router>
//       <Routes>
//         {/* Landing Page */}
//         <Route path="/landing" element={<LandingPage />} />

//         {/* Customer Routes */}
//         <Route path="/" element={
//           <div>
//             <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//               <div className="container">
//                 <Link className="navbar-brand" to="/">Booking System</Link>
//                 <button
//                   className="navbar-toggler"
//                   type="button"
//                   data-bs-toggle="collapse"
//                   data-bs-target="#navbarNav"
//                   aria-controls="navbarNav"
//                   aria-expanded={!isNavCollapsed}
//                   aria-label="Toggle navigation"
//                   onClick={() => setIsNavCollapsed(!isNavCollapsed)}
//                 >
//                   <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
//                   <div className="navbar-nav">
//                     <Link className="nav-link" to="/" onClick={() => setIsNavCollapsed(true)}>New Booking</Link>
//                     <Link className="nav-link" to="/bookings" onClick={() => setIsNavCollapsed(true)}>View Bookings</Link>
//                     <Link className="nav-link" to="/landing" onClick={() => setIsNavCollapsed(true)}>Switch Portal</Link>
//                   </div>
//                 </div>
//               </div>
//             </nav>
//             <Routes>
//               <Route index element={<BookingForm />} />
//               <Route path="/bookings" element={<BookingList />} />
//             </Routes>
//           </div>
//         } />

//         {/* Vendor Routes */}
//         <Route path="/vendor" element={<VendorLayout />}>
//           <Route index element={<VendorAvailableBookings />} />
//           <Route path="accepted" element={<VendorAcceptedBookings />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

