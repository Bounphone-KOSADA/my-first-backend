let users = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "John Smith",
  },
  {
    id: 3,
    name: "John Wick",
  },
];

const getAllUsers = (req, res) => {
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
};

const getUserById = (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  res.status(200).json({
    success: true,
    data: user,
  });
};

module.exports = {
  getAllUsers,
  getUserById
};
