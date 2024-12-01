import { Outlet, Link, useLocation } from 'react-router-dom';

function VendorLayout() {
  const location = useLocation();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/vendor">Vendor Panel</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#vendorNav"
            aria-controls="vendorNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="vendorNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/vendor' ? 'active' : ''}`}
                  to="/vendor"
                >
                  Available Bookings
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/vendor/accepted' ? 'active' : ''}`}
                  to="/vendor/accepted"
                >
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default VendorLayout;