const bcrypt = require('bcrypt');

const users = [];
let nextId = 1;

const User = {
  create: async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = {
      id: nextId++,
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      createdAt: new Date()
    };

    users.push(user);

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  findByEmail: (email) => {
    return users.find(user => user.email === email);
  },

  findById: (id) => {
    const user = users.find(user => user.id === parseInt(id));
    if (!user) return null;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  comparePassword: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
};

module.exports = User;
