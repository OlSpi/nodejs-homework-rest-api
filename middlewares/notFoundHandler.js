const notFoundHandler = (req, res) => {
  res.status(404).json({ message: "missing fields" });
};

module.exports = notFoundHandler;
