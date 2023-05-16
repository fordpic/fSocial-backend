# fSocial

fSocial is a social site that allows users to view posts, upload posts, as well as leave comments on them, all with full CRUD functionality. fSocial users must first create an account on the site and log in, which will allow them to see other users' posts, comment on them, and make posts of their own, all from their own account. Passwords are encrypted on the backend and JWT is used for authentication, ensuring user info stays secure. The fSocial backend is a REST API that stores and returns all of the data for fSocial. 

This repository holds the backend code for fSocial; the frontend code can be found [here](https://github.com/fordpic/fSocial-frontend)

### Key Features

- Error handling with custom messsages
- Passwords hashed & secured before storing
- Full schema for all entities & some for future iterations

### Technologies Used

- Express for the server
- PostgreSQL for the database
- Prisma as the ORM
- Vercel for deployment
- bcrypt for hashing user passwords before storing in database
- JWT for authentication
- CORS to allow deployments to communicate
- cookie-parser for parsing cookies
- dotenv for secret environment variables

### Next Steps

This project is at MVP; more work can always be done! Looking forward I will be working on incorporating the below for the fSocial backend:

- Use multer and AWS S3 bucket to allow users to upload and save images
- Incorporate likes; the entity is already complete
- Rewrite in TypeScript

### Contributing

If you would like to contribute and/or make an improvement, please make a PR and tag me (fordpic) so that I can review and merge!
