import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

// Create booking
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      name, mobile, email, city, moveDate, pickupLocation, dropLocation,
      pickupLift, pickupFloors, dropLift, dropFloors, items, packagingType
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO bookings (name, mobile, email, city, move_date, pickup_location, 
        drop_location, pickup_lift, pickup_floors, drop_lift, drop_floors, 
        packaging_type, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [name, mobile, email, city, moveDate, pickupLocation, dropLocation,
       pickupLift, pickupFloors, dropLift, dropFloors, packagingType]
    );

    const bookingId = result.insertId;

    // Insert items
    for (const item of items) {
      await pool.query(
        'INSERT INTO booking_items (booking_id, item_name, quantity) VALUES (?, ?, ?)',
        [bookingId, item.name, item.quantity]
      );
    }

    res.json({ success: true, bookingId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const [bookings] = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get booking by id
app.get('/api/bookings/:id', async (req, res) => {
  try {
    const [booking] = await pool.query('SELECT * FROM bookings WHERE id = ?', [req.params.id]);
    const [items] = await pool.query('SELECT * FROM booking_items WHERE booking_id = ?', [req.params.id]);
    res.json({ ...booking[0], items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update booking
app.put('/api/bookings/:id', async (req, res) => {
  try {
    const { status, cost } = req.body;
    await pool.query(
      'UPDATE bookings SET status = ?, cost = ? WHERE id = ?',
      [status, cost, req.params.id]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vendor Routes

// Get available bookings for vendors (only confirmed status)
app.get('/api/vendor/available-bookings', async (req, res) => {
  try {
    const [bookings] = await pool.query(
      `SELECT b.*, bi.* 
       FROM bookings b 
       LEFT JOIN booking_items bi ON b.id = bi.booking_id 
       WHERE b.status = 'confirmed' AND b.vendor_id IS NULL 
       ORDER BY b.created_at DESC`
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get vendor's accepted bookings
app.get('/api/vendor/accepted-bookings', async (req, res) => {
  try {
    // In a real app, you'd get vendorId from the authenticated session
    const vendorId = req.query.vendorId;
    const [bookings] = await pool.query(
      `SELECT b.*, bi.* 
       FROM bookings b 
       LEFT JOIN booking_items bi ON b.id = bi.booking_id 
       WHERE b.vendor_id = ? 
       ORDER BY b.created_at DESC`,
      [vendorId]
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Accept booking by vendor
app.post('/api/vendor/accept-booking/:id', async (req, res) => {
  try {
    // In a real app, you'd get vendorId from the authenticated session
    //const vendorId = req.body.vendorId;
    const vendorId = 2;
    const bookingId = req.params.id;
    
    await pool.query(
      'UPDATE bookings SET status = "assigned", vendor_id = ? WHERE id = ? AND status = "confirmed"',
      [vendorId, bookingId]
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});