import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'cdac',
  database: 'booking_system11'
});

export default pool;