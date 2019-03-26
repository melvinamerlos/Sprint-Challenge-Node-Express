const express = require("express");
const actionDb = require("../helpers/actionModel.js");
const projectDb = require("../helpers/projectModel.js");
const router = express.Router();

// ===================== ENDPOINTS =====================

router.get("/", async (req, res) => {
  try {
    const projects = await projectDb.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: `Error 500: could not retrieve the projects.` });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await projectDb.get(req.params.id);
    project
      ? res.status(200).json(project)
      : res.status(404).json({
          message: `Error 404: The project id #${req.params.id} could not be found.`
        });
  } catch (error) {
    res.status(500).json({
      error: `Error 500: The project could not be found. ${error}`
    });
  }
});

router.get("/:id/actions", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectDb.get(id);
    const allProjectActions = await projectDb.getProjectActions(id);
    if (!project) {
      res.status(404).json({
        message: `Error 404: The project with the id #${req.params.id} does not exist.`
      });
    } else {
      res.status(200).json(allProjectActions);
    }
  } catch (error) {
    res.status(500).json({
      error: `Error 500: Project's actions could not retrieved.`
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({
        error: `Error 400: A name and description for you project is required.`
      });
    } else {
      const project = await projectDb.insert(req.body);
      res.status(201).json(project);
    }
  } catch (error) {
    res.status(500).json({
      error: `Error 500: An error was encountered saving the project.`
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const actions = await projectDb.getProjectActions(req.params.id);
    await actions.forEach(async action => {
      await actionDb.remove(action.id);
    });
    const count = await projectDb.remove(req.params.id);

    if (count > 0) {
      res.status(200).json({
        message: `The project has been deleted.`
      });
    } else {
      res.status(404).json({
        message: `Error 404: The project id #${req.params.id} could not be found.`
      });
    }
  } catch (error) {
    res.status(500).json({
      error: `Error 500: The project could not be removed.`
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;
    if (!name || !description) {
      res.status(400).json({
        message: `Error 400: A name and description for you project is required.`
      });
    } else {
      const project = await projectDb.update(id, req.body);
      res.status(200).json(project);
    }
  } catch (error) {
    res.status({
      error: `Error 500: The project could not be updated.`
    });
  }
});

module.exports = router;
