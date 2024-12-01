import { useState, useEffect } from 'react';
import axios from 'axios';
import BookingCard from './BookingCard';

function VendorAcceptedBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAcceptedBookings();
  }, []);

  const fetchAcceptedBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/vendor/accepted-bookings');
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching accepted bookings');
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Accepted Bookings</h2>
      {bookings.length === 0 ? (
        <div className="alert alert-info">No accepted bookings yet</div>
      ) : (
        <div className="row g-4">
          {bookings.map(booking => (
            <div key={booking.id} className="col-12 col-md-6 col-lg-4">
              <BookingCard
                booking={booking}
                showCustomerInfo={false}
                showAcceptButton={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VendorAcceptedBookings;