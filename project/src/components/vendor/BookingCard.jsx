import React from 'react';

function BookingCard({ booking, onAccept, showCustomerInfo = false, showAcceptButton = true }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title">Booking #{booking.id}</h5>
          <span className="badge bg-primary">${booking.cost}</span>
        </div>

        <div className="mb-3">
          <h6 className="text-primary">Moving Details</h6>
          <p className="mb-1">
            <strong>Date:</strong> {new Date(booking.move_date).toLocaleDateString()}
          </p>
          <p className="mb-1">
            <strong>City:</strong> {booking.city}
          </p>
        </div>

        <div className="mb-3">
          <h6 className="text-primary">Locations</h6>
          <p className="mb-1">
            <strong>Pickup:</strong> {booking.pickup_location}
          </p>
          <p className="mb-1">
            <strong>Drop:</strong> {booking.drop_location}
          </p>
        </div>

        <div className="mb-3">
          <h6 className="text-primary">Items</h6>
          <div className="table-responsive">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {booking.items?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.item_name}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showCustomerInfo && (
          <div className="mb-3">
            <h6 className="text-primary">Customer Details</h6>
            <p className="mb-1">
              <strong>Name:</strong> {booking.name}
            </p>
            <p className="mb-1">
              <strong>Mobile:</strong> {booking.mobile}
            </p>
            <p className="mb-1">
              <strong>Email:</strong> {booking.email}
            </p>
          </div>
        )}

        {showAcceptButton && (
          <button
            className="btn btn-primary w-100"
            onClick={() => onAccept(booking.id)}
          >
            Accept Booking
          </button>
        )}
      </div>
    </div>
  );
}

export default BookingCard;