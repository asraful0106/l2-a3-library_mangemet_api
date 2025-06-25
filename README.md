# Library Management API with Express, TypeScript & MongoDB

A robust RESTful API built with TypeScript, Express.js and MongoDB to manage library operations, including book management and borrowing functionalities.

## Features

- **Book Management**: Create, read, update, and delete (CRUD) operations for books.
  - Retrieve all books or a single book by ID.
  - Add new books to the library.
  - Update existing book details.
  - Delete books from the library.
- **Borrow Management**: Handle book borrowing and retrieval of borrow details.
  - View borrowing details.
  - Create new borrow records.

## Prerequisites

- Node.js (v14.x or later)
- npm (comes with Node.js)
- MongoDB (for database storage)
- Mongoose (ORM)

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/asraful0106/l2-a3-library_mangemet_api.git
   ```

2. **Install Dependencies**
```bash
npm install
```
3. **Set Up Environment Variables**

- Create a .env file in the root directory.
- Add the following variables:
```bash
MONGODB_URI=your_mongodb_connection_string
PORT=your_preferred_port
```
- Replace your_mongodb_connection_string with your MongoDB URI and your_preferred_port with the desired port number.

4. **Run the Application**
```bash
npm run dev
```

## API Endpoints

**Books**
- GET /api/books - Retrieve all books.
- GET /api/books/:bookId - Retrieve a single book by ID.
- POST /api/books - Create a new book.
- PUT /api/books/:bookId - Update a book by ID.
- DELETE /api/books/:bookId - Delete a book by ID.

**Borrow**
- GET /api/borrow - Retrieve borrow details.
- POST /api/borrow - Create a new borrow record.

## Project Structure

Library Management API with Express, TypeScript & MongoDB<br>
```
├── node_modules<br>
├── src<br>
│   ├── controllers<br>
│   │   ├── book.controller.ts<br>
│   │   └── borrow.controller.ts<br>
│   ├── database<br>
│   │   └── db.ts<br>
│   ├── interfaces<br>
│   │   ├── book.interface.ts<br>
│   │   └── borrow.interface.ts<br>
│   ├── models<br>
│   │   ├── book.model.ts<br>
│   │   └── borrow.model.ts<br>
│   ├── routers<br>
│   │   ├── book.route.ts<br>
│   │   └── borrow.route.ts<br>
│   ├── app.ts<br>
│   └── server.ts<br>
├── .env<br>
├── .gitignore<br>
├── package-lock.json<br>
├── package.json<br>
└── tsconfig.json<br>
```

## Contact
For any questions or support, please open an issue on the GitHub repository.