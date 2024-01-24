const errorHandler = (err, req, res, next) => {
  console.error("ERR", req.method, req.path, err);

  if (!res.headersSent) {
    res
      .status(500)
      .json({ message: "Internal server error. Check the server console" });
  }
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: "This route does not exist" });
};

module.exports = { errorHandler, notFoundHandler };
