import { useState } from 'react';
import axios from 'axios';

function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    moveDate: '',
    pickupLocation: '',
    dropLocation: '',
    pickupLift: 'No',
    pickupFloors: 0,
    dropLift: 'No',
    dropFloors: 0,
    items: [{ name: '', quantity: 1 }],
    packagingType: 'Single-Layered'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/bookings', formData);
      alert('Booking created successfully!');
      // Reset form
      setFormData({
        name: '',
        mobile: '',
        email: '',
        city: '',
        moveDate: '',
        pickupLocation: '',
        dropLocation: '',
        pickupLift: 'No',
        pickupFloors: 0,
        dropLift: 'No',
        dropFloors: 0,
        items: [{ name: '', quantity: 1 }],
        packagingType: 'Single-Layered'
      });
    } catch (error) {
      alert('Error creating booking');
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', quantity: 1 }]
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData({ ...formData, items: newItems });
    }
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <h2 className="mb-4">New Booking</h2>
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Mobile</label>
                <input
                  type="tel"
                  className="form-control"
                  required
                  pattern="[0-9]{10}"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Date of Moving</label>
                <input
                  type="date"
                  className="form-control"
                  required
                  value={formData.moveDate}
                  onChange={(e) => setFormData({ ...formData, moveDate: e.target.value })}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Pickup Location</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={formData.pickupLocation}
                  onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Drop Location</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={formData.dropLocation}
                  onChange={(e) => setFormData({ ...formData, dropLocation: e.target.value })}
                />
              </div>

              <div className="col-12 col-sm-6 col-md-3">
                <label className="form-label">Lift at Pickup</label>
                <select
                  className="form-select"
                  value={formData.pickupLift}
                  onChange={(e) => setFormData({ ...formData, pickupLift: e.target.value })}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {formData.pickupLift === 'No' && (
                <div className="col-12 col-sm-6 col-md-3">
                  <label className="form-label">Pickup Floors</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    value={formData.pickupFloors}
                    onChange={(e) => setFormData({ ...formData, pickupFloors: e.target.value })}
                  />
                </div>
              )}

              <div className="col-12 col-sm-6 col-md-3">
                <label className="form-label">Lift at Drop</label>
                <select
                  className="form-select"
                  value={formData.dropLift}
                  onChange={(e) => setFormData({ ...formData, dropLift: e.target.value })}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {formData.dropLift === 'No' && (
                <div className="col-12 col-sm-6 col-md-3">
                  <label className="form-label">Drop Floors</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    value={formData.dropFloors}
                    onChange={(e) => setFormData({ ...formData, dropFloors: e.target.value })}
                  />
                </div>
              )}
            </div>

            <h4 className="mt-4 mb-3">Items</h4>
            {formData.items.map((item, index) => (
              <div className="row g-3 align-items-end mb-3" key={index}>
                <div className="col-12 col-sm-6">
                  <label className="form-label">Item Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={item.name}
                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                  />
                </div>
                <div className="col-8 col-sm-4">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                  />
                </div>
                <div className="col-4 col-sm-2">
                  <button
                    type="button"
                    className="btn btn-danger w-100"
                    onClick={() => removeItem(index)}
                    disabled={formData.items.length === 1}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            
            <button type="button" className="btn btn-secondary mb-4" onClick={addItem}>
              Add Item
            </button>

            <div className="row">
              <div className="col-12 col-md-6">
                <label className="form-label">Packaging Type</label>
                <select
                  className="form-select"
                  value={formData.packagingType}
                  onChange={(e) => setFormData({ ...formData, packagingType: e.target.value })}
                >
                  <option value="Single-Layered">Single-Layered</option>
                  <option value="Double-Layered">Double-Layered</option>
                  <option value="Wooden">Wooden</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-primary">Submit Booking</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;