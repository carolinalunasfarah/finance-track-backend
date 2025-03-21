const methodNotAllowed = (req, res) => {
    res.status(405).json({ message: "Method not allowed" });
};

export default methodNotAllowed;
