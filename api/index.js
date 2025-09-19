// Vercel serverless entry for the Express app
const app = require('../backend/app');

module.exports = (req, res) => {
	return app(req, res);
};


