import { useState, useEffect } from 'react';
import axios from 'axios';
import BookingCard from './BookingCard';

function VendorAvailableBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAvailableBookings();
  }, []);

  const fetchAvailableBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/vendor/available-bookings');
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching available bookings');
      setLoading(false);
    }
  };

  const handleAcceptBooking = async (bookingId) => {
    try {
      var vendorId = 2;
      await axios.post(`http://localhost:3000/api/vendor/accept-booking/${bookingId}`);
      // Remove the accepted booking from the list
      setBookings(bookings.filter(booking => booking.id !== bookingId));
    } catch (error) {
      setError('Error accepting booking');
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Available Bookings</h2>
      {bookings.length === 0 ? (
        <div className="alert alert-info">No available bookings at the moment</div>
      ) : (
        <div className="row g-4">
          {bookings.map(booking => (
            <div key={booking.id} className="col-12 col-md-6 col-lg-4">
              <BookingCard
                booking={booking}
                onAccept={() => handleAcceptBooking(booking.id)}
                showCustomerInfo={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VendorAvailableBookings;