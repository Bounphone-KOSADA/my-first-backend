const users = [];
let nextId = 1;

const User = {
  create: (userData) => {
    // TODO: Implement user creation
    // 1. Hash the password using bcrypt
    // 2. Create user object with hashed password
    // 3. Add to users array
    // 4. Return user without password
  },

  findByEmail: (email) => {
    // TODO: Find user by email
  },

  findById: (id) => {
    // TODO: Find user by id
  }
};

module.exports = User;
