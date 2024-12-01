import React, { useEffect } from 'react';

function BookingDetailsModal({ booking, onClose }) {
  if (!booking) return null;

  useEffect(() => {
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" tabIndex="-1" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title d-flex align-items-center">
              <span className="me-2">Booking Details</span>
              <span className="badge bg-primary">#{booking.id}</span>
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row g-4">
              {/* Rest of the modal content remains the same */}
              <div className="col-12 col-md-6">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="card-title text-primary mb-3">Personal Information</h6>
                    <dl className="row mb-0">
                      <dt className="col-sm-4">Name</dt>
                      <dd className="col-sm-8">{booking.name}</dd>
                      
                      <dt className="col-sm-4">Mobile</dt>
                      <dd className="col-sm-8">{booking.mobile}</dd>
                      
                      <dt className="col-sm-4">Email</dt>
                      <dd className="col-sm-8">{booking.email}</dd>
                      
                      <dt className="col-sm-4">City</dt>
                      <dd className="col-sm-8">{booking.city}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              
              <div className="col-12 col-md-6">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="card-title text-primary mb-3">Moving Details</h6>
                    <dl className="row mb-0">
                      <dt className="col-sm-4">Date</dt>
                      <dd className="col-sm-8">{new Date(booking.move_date).toLocaleDateString()}</dd>
                      
                      <dt className="col-sm-4">Status</dt>
                      <dd className="col-sm-8">
                        <span className={`badge bg-${getStatusBadgeColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </dd>
                      
                      <dt className="col-sm-4">Cost</dt>
                      <dd className="col-sm-8">${booking.cost || 'Not set'}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title text-primary mb-3">Location Details</h6>
                    <dl className="row mb-0">
                      <dt className="col-sm-2">Pickup</dt>
                      <dd className="col-sm-10">{booking.pickup_location}</dd>
                      
                      <dt className="col-sm-2">Drop</dt>
                      <dd className="col-sm-10">{booking.drop_location}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title text-primary mb-3">Pickup Details</h6>
                    <dl className="row mb-0">
                      <dt className="col-sm-6">Lift Available</dt>
                      <dd className="col-sm-6">{booking.pickup_lift}</dd>
                      
                      {booking.pickup_lift === 'No' && (
                        <>
                          <dt className="col-sm-6">Floor Number</dt>
                          <dd className="col-sm-6">{booking.pickup_floors}</dd>
                        </>
                      )}
                    </dl>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title text-primary mb-3">Drop Details</h6>
                    <dl className="row mb-0">
                      <dt className="col-sm-6">Lift Available</dt>
                      <dd className="col-sm-6">{booking.drop_lift}</dd>
                      
                      {booking.drop_lift === 'No' && (
                        <>
                          <dt className="col-sm-6">Floor Number</dt>
                          <dd className="col-sm-6">{booking.drop_floors}</dd>
                        </>
                      )}
                    </dl>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title text-primary mb-3">Items List</h6>
                    <div className="table-responsive">
                      {booking.items && booking.items.length > 0 ? (
                        <table className="table table-sm table-hover">
                          <thead className="table-light">
                            <tr>
                              <th>Item Name</th>
                              <th>Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            {booking.items.map((item, index) => (
                              <tr key={index}>
                                <td>{item.item_name}</td>
                                <td>{item.quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-muted mb-0">No items listed</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusBadgeColor(status) {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'confirmed':
      return 'info';
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'danger';
    default:
      return 'secondary';
  }
}

export default BookingDetailsModal;