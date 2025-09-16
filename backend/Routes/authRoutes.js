const express = require('express');
const db = require('../db'); 
const router = express.Router();

// Register
router.post('/register', (req, res) => {
    const { username, password, role, phone } = req.body;  
    const sql = 'INSERT INTO users (username, password, role, phone) VALUES (?, ?, ?, ?)';
    db.query(sql, [username, password, role, phone], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') { 
                return res.status(400).json({ message: 'Username already taken' });
            }
            return res.status(500).json({ message: 'Server error', error: err });
        }
        res.json({ message: 'Registration successful' });
    });
});

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length > 0) {
            res.json({
                success: true,
                user_id: result[0].user_id,
                user_type: result[0].role,    // matching frontend expectation
                username: result[0].username  // matching frontend expectation
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });
});

// Change Password (Admin only)
router.post('/change-password', (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const sql = 'SELECT * FROM users WHERE role = "admin"';
    db.query(sql, (err, result) => {
        if (err) return res.status(500).send('Error occurred');
        const user = result[0];
        if (user) {
            if (user.password === currentPassword) {
                const updateSql = 'UPDATE users SET password = ? WHERE user_id = ?';
                db.query(updateSql, [newPassword, user.user_id], (err) => {
                    if (err) return res.status(500).send('Failed to update password');
                    res.json({ success: true });
                });
            } else {
                res.status(401).send('Incorrect current password');
            }
        } else {
            res.status(404).send('User not found');
        }
    });
});

// Get Users
router.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) return res.status(500).send(err);
        const users = result.map(user => ({
            ...user,
            id: user.user_id
        }));
        res.json(users);
    });
});

// Delete User
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE user_id = ?';
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('User deleted successfully');
    });
});

// Update User
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { username, role, phone } = req.body;
    const sql = 'UPDATE users SET username = ?, role = ?, phone = ? WHERE user_id = ?';
    db.query(sql, [username, role, phone, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('User updated successfully');
    });
});

// Dashboard Stats
router.get('/stats', (req, res) => {
    const stats = {};
    const totalUsersQuery = "SELECT COUNT(*) AS totalUsers FROM users";
    const totalTeachersQuery = "SELECT COUNT(*) AS totalTeachers FROM users WHERE role = 'teacher'";
    const totalStudentsQuery = "SELECT COUNT(*) AS totalStudents FROM users WHERE role = 'student'";

    db.query(totalUsersQuery, (err, users) => {
        if (err) return res.status(500).json({ error: err });
        stats.totalUsers = users[0].totalUsers;

        db.query(totalTeachersQuery, (err, teachers) => {
            if (err) return res.status(500).json({ error: err });
            stats.totalTeachers = teachers[0].totalTeachers;

            db.query(totalStudentsQuery, (err, students) => {
                if (err) return res.status(500).json({ error: err });
                stats.totalStudents = students[0].totalStudents;

                res.json(stats);
            });
        });
    });
});


module.exports = router;
