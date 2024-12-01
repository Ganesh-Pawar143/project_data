import React, { useState, useEffect } from 'react';

function StatusUpdateModal({ booking, onUpdate, onClose }) {
  const [status, setStatus] = useState(booking.status);
  const [cost, setCost] = useState(booking.cost || '');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!status) newErrors.status = 'Status is required';
    if (cost === '') newErrors.cost = 'Cost is required';
    if (cost < 0) newErrors.cost = 'Cost cannot be negative';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      onUpdate(booking.id, status, parseFloat(cost));
      onClose();
    } else {
      setErrors(newErrors);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" tabIndex="-1" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Booking - #{booking.id}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label fw-bold">Current Status: <span className="fw-normal">{booking.status}</span></label>
                <select
                  className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setErrors({ ...errors, status: null });
                  }}
                  autoFocus
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                {errors.status && <div className="invalid-feedback">{errors.status}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Current Cost: <span className="fw-normal">${booking.cost || '0'}</span></label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    className={`form-control ${errors.cost ? 'is-invalid' : ''}`}
                    value={cost}
                    onChange={(e) => {
                      setCost(e.target.value);
                      setErrors({ ...errors, cost: null });
                    }}
                    step="0.01"
                    min="0"
                  />
                  {errors.cost && <div className="invalid-feedback">{errors.cost}</div>}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StatusUpdateModal;