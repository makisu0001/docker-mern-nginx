module.exports = (app) => {
  const admin = require("../controllers/admin.controller.js");

  const router = require("express").Router();

  const upload = require("../utils/upload.js");

  // Create a new Tutorial
  router.post("/", admin.create);

  // Retrieve all Tutorials
  router.get("/", admin.findAll);

  router.post("/login", admin.login);

  router.get("/intro", admin.getIntro);

  router.put("/intro", admin.updateIntro);

  router.get("/avatar", admin.getAvatar);

  router.post("/uploadAvatar", upload.single("avatar"), admin.uploadAvatar);

  router.get("/background", admin.getBackground);

  router.post(
    "/uploadBackground",
    upload.single("background"),
    admin.uploadBackground
  );

  router.post("/uploadCover", upload.single("cover"), admin.uploadCover);

  router.post(
    "/uploadResource",
    upload.single("resource"),
    admin.uploadResource
  );

  router.get("/works", admin.works);

  router.put("/work", admin.addWork);

  router.post("/removeWork", admin.removeWork);

  // Retrieve all published Tutorials
  router.get("/published", admin.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", admin.findOne);

  // Update a Tutorial with id
  router.put("/:id", admin.update);

  // Delete a Tutorial with id
  router.delete("/:id", admin.delete);

  // Create a new Tutorial
  router.delete("/", admin.deleteAll);

  app.use("/api", router);
};
