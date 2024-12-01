import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center text-center">
        <div className="col-md-8">
          <h1 className="display-4 mb-4">Welcome to Booking System</h1>
          <p className="lead mb-5">Choose your portal to continue</p>
          
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Customer Portal</h5>
                  <p className="card-text flex-grow-1">Create and manage your bookings</p>
                  <Link to="/" className="btn btn-primary">Enter Customer Portal</Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Vendor Portal</h5>
                  <p className="card-text flex-grow-1">View and accept available bookings</p>
                  <Link to="/vendor" className="btn btn-secondary">Enter Vendor Portal</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;