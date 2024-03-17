## URL Shortener Service with Analytics - v1.0.0

### Features

- **Short URL Generation:** Creates unique short URLs using custom encoding to prevent collisions.
- **Pseudo-Random Shortcodes:** Employs a range-based ticket generation system for randomness in short code creation.
- **Non-Blocking Redirection & Async Stats:** Achieves smooth user experience with non-blocking redirection and asynchronous stat generation.
- **Fast Analytics:** Provides quick access to total clicks, top browsers, device types, active hours, weekdays, and months.
- **Optional Expiry Config & Auto-Deletion:** Allows setting expiry for URLs and schedules automatic deletion of expired entries.

### Performance

- **Redis Caching:** Improves response times for frequently accessed data like analytics, original URLs, and recently created short URLs.
- **Kafka Asynchronous Processing:** Enables efficient handling of high traffic through asynchronous processing of analytics data.
- **MongoDB Indexing:** Optimizes read performance by utilizing indexes on frequently queried fields.
- **MongoDB Read Efficiency:** Leverages MongoDB's strengths for efficient data retrieval.

### System Flow

1. **Ticket Generation:** A `TicketCollection` is seeded with large ranges that are valid for one year, allowing for 100 million requests per month.
2. **User Management:** Users register, log in, and access functionalities through secure JWT authentication.
3. **Short URL Creation:** Users create short URLs for long ones, optionally setting expiration dates. Short URLs are unique for each long URL.
4. **Link Service Communication:** The Link Service interacts with the Ticket Service to obtain a unique integer from a range and atomically increments it (Mongodb Transactions).
5. **Shortcode Encoding:** The Link Service encodes the integer using custom encoding to create the final short URL.
6. **Redirection:** Users visiting a short URL are redirected to the original URL.
7. **Asynchronous Data Processing:** Information about the visit is published to a Kafka queue.
8. **Analytics Generation:** An Analytics Service subscribes to the Kafka queue and stores relevant data in MongoDB.
9. **Analytics Retrieval:** Authorized users can access analytics via various MongoDB aggregation queries.
10. **Scheduled Deletion:** A cron job runs daily at 1AM to delete expired URLs.

### Environment Variables

- `JWT_SECRET`: Secret key used for JWT authentication.
- `MONGO_URI`: Connection string for your MongoDB database.
- `REDIS_HOST`: Hostname or IP address of your Redis server.
- `REDIS_PORT`: Port number of your Redis server.
- `REDIS_USERNAME`: Username for your Redis server.
- `REDIS_PASSWORD`: Password for your Redis server.

### Running Locally

1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the local Kafka service: `docker-compose -f docker-compose-kafka.yml up` (if using docker)
4. Start the application: `npm run start:dev`
