# Backend environment variables

Create a .env file in backend_express_api with the following variables:

- MONGODB_URI: MongoDB connection string (e.g., mongodb+srv://user:pass@cluster/dbname?retryWrites=true&w=majority)
- PORT: Optional, defaults to 3001
- HOST: Optional, defaults to 0.0.0.0

Notes:
- Only read operations are exposed under /api.
- Visit /docs for Swagger UI.
