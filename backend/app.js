const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
app.use(cors({
	origin: process.env.CLIENT_URL || 'http://localhost:3000',
	credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection (cache connection in serverless)
let isMongooseConnected = false;
async function ensureDatabaseConnection() {
	if (isMongooseConnected) return;
	const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
	try {
		await mongoose.connect(mongoUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		isMongooseConnected = true;
		console.log('MongoDB connected successfully');
	} catch (err) {
		console.error('MongoDB connection error:', err);
	}
}

// Connect lazily before handling requests (good for serverless cold starts)
app.use(async (req, res, next) => {
	if (!isMongooseConnected) {
		await ensureDatabaseConnection();
	}
	next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/education', require('./routes/education'));

// Health check endpoint
app.get('/api/health', (req, res) => {
	res.json({ message: 'Portfolio API is running!', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// 404 handler
app.use('*', (req, res) => {
	res.status(404).json({ message: 'Route not found' });
});

module.exports = app;


