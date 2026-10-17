import express from 'express';
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import { AppError } from './utils/appError.js';
import { loadEnvFile } from "node:process";
import bcrypt from 'bcrypt';
import { connectDB } from "./config/connectDB.js";
import { createUser } from "./services/user-service.js" 

const app = express();
const PORT = 3000;
loadEnvFile();
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASSWORD;
const dbname = 'test';

const mongoUrl = `mongodb+srv://${dbuser}:${dbpass}@cluster0.jt2fuzs.mongodb.net/${dbname}`;
connectDB(mongoUrl);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/user', (req, res) => {
  res.sendFile(process.cwd() + '/public/user.html');
});

app.post('/user', async (req, res) => {
    try {
        const { username, name, email, password } = req.body;

        // Check that all fields are provided
        if (!username || !name || !email || !password) {
            return res.status(400).send('All fields are required.');
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the user in MongoDB
        const newUser = await createUser({
            username,
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'User created successfully!',
            user: {
                id: newUser._id,
                username: newUser.username,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).send(
                'Username or email already exists.'
            );
        }

        console.error(error);
        res.status(500).send('An error occurred while creating the user.');
    }
});

// Serve static files from the 'public' directory so index.html loads on http://localhost:3000
app.use(express.static('client'));

// Mount Routers
// Mount authRoutes on '/api/auth'
app.use('/api/auth', authRoutes);
// Mount apiRoutes on '/api/'
app.use('/api', apiRoutes);

// 404 Unhandled Route Handler
app.all("/{*splat}", (req, res, next) => {
    next(new AppError(`Cannot find route ${req.originalUrl} on this server!`, 404));
});

// Centralized Global Error Handler
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`🚀 SustainHub Server running at http://localhost:${PORT}`);
});
