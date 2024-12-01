import { useState, useEffect } from 'react';
import axios from 'axios';
import BookingDetailsModal from './BookingDetailsModal';
import StatusUpdateModal from './StatusUpdateModal';

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [statusUpdateBooking, setStatusUpdateBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleViewDetails = async (bookingId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/bookings/${bookingId}`);
      setSelectedBooking(response.data);
    } catch (error) {
      console.error('Error fetching booking details:', error);
    }
  };

  const updateBooking = async (id, status, cost) => {
    try {
      await axios.put(`http://localhost:3000/api/bookings/${id}`, { status, cost });
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Booking List</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th className="d-none d-md-table-cell">Date</th>
              <th>Status</th>
              <th className="d-none d-md-table-cell">Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.name}</td>
                <td className="d-none d-md-table-cell">
                  {new Date(booking.move_date).toLocaleDateString()}
                </td>
                <td>{booking.status}</td>
                <td className="d-none d-md-table-cell">${booking.cost || '0'}</td>
                <td>
                  <div className="d-flex flex-column flex-md-row gap-2">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleViewDetails(booking.id)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setStatusUpdateBooking(booking)}
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}

      {statusUpdateBooking && (
        <StatusUpdateModal
          booking={statusUpdateBooking}
          onUpdate={updateBooking}
          onClose={() => setStatusUpdateBooking(null)}
        />
      )}
    </div>
  );
}

export default BookingList;