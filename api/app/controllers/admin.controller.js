const db = require("../models");
const Admin = db.admin;

const init = async () => {
  const data = await Admin.findOne();
  if (data === null) {
    const admin = new Admin({
      intro: [],
      photo: "",
      background: "",
      color: "",
      albums: [],
    });
  }
};
init();

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const admin = new Admin({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  });

  // Save Tutorial in the database
  admin
    .save(admin)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.login = (req, res) => {
  const success =
    req.body?.account === "hello" && req.body?.password === "kitty";
  res.status(200).send({ code: success ? 1 : 0 });
};

exports.getIntro = async (req, res) => {
  try {
    const data = await Admin.findOne();
    const intro = data.intro || [];
    res.status(200).send({ code: 1, intro });
  } catch (error) {
    res.status(400).send({ code: 0 });
  }
};

exports.updateIntro = async (req, res) => {
  const intro = req.body?.intro;
  if (!Array.isArray(intro)) {
    res.status(400).send({ code: 0 });
  } else {
    try {
      const data = await Admin.findOne();
      data.intro = intro;
      await data.save();
      res.status(200).send({ code: 1 });
    } catch (error) {
      res.status(400).send({ code: 0 });
    }
  }
};

exports.getAvatar = async (req, res) => {
  try {
    const data = await Admin.findOne();
    res.status(200).send({ code: 1, avatar: data.avatar });
  } catch (error) {
    res.status(400).send({ code: 0 });
  }
};

exports.uploadAvatar = async (req, res) => {
  const filename = req.file?.filename;
  try {
    const data = await Admin.findOne();
    data.avatar = filename;
    await data.save();
    res.status(200).send({ code: 1, filename: req.file?.filename });
  } catch (error) {
    res.status(400).send({ code: 0 });
  }
};

exports.getBackground = async (req, res) => {
  try {
    const data = await Admin.findOne();
    res.status(200).send({ code: 1, background: data.background });
  } catch (error) {
    res.status(400).send({ code: 0 });
  }
};

exports.uploadBackground = async (req, res) => {
  const filename = req.file?.filename;
  try {
    const data = await Admin.findOne();
    data.background = filename;
    await data.save();
    res.status(200).send({ code: 1, filename: req.file?.filename });
  } catch (error) {
    res.status(400).send({ code: 0 });
  }
};

exports.uploadCover = async (req, res) => {
  const filename = req.file?.filename;
  try {
    res.status(200).send({ code: 1, filename });
  } catch (error) {
    res.status(400).send({ code: 0 });
  }
};

exports.uploadResource = async (req, res) => {
  const filename = req.file?.filename;
  try {
    res.status(200).send({ code: 1, filename });
  } catch (error) {
    res.status(400).send({ code: 0 });
  }
};

exports.works = async (req, res) => {
  try {
    const data = await Admin.findOne();
    res.status(200).send({ code: 1, works: data.works });
  } catch (error) {
    res.status(400).send({ code: 0 });
  }
};

exports.addWork = async (req, res) => {
  const work = req.body.work;
  try {
    const data = await Admin.findOne();
    data.works = [...data.works, work];
    await data.save();
    res.status(200).send({ code: 1 });
  } catch (error) {
    res.status(400).send({ code: 0 });
  }
};

exports.removeWork = async (req, res) => {
  const id = req.body.id;
  try {
    const data = await Admin.findOne();
    const works = data.works.filter(({ _id }) => _id != id);
    data.works = works;
    await data.save();
    res.status(200).send({ code: 1 });
  } catch (error) {
    res.status(400).send({ code: 0 });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Tutorial.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
