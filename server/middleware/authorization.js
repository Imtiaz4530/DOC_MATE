export const authorizedDoctor = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "UnAuthorized! User is not a Doctor" });
    }

    next();
  } catch (e) {
    console.error("Error in authorizedDoctor middleware ---> ", e.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const authorizedPatient = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "patient") {
      return res
        .status(403)
        .json({ message: "UnAuthorized! User is not a Patient" });
    }

    next();
  } catch (e) {
    console.error("Error in authorizedDoctor middleware ---> ", e.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
