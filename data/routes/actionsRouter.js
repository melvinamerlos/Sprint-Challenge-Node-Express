
const express = require("express");
const actionDb = require("../helpers/actionModel.js");
const router = express.Router();

// ===================== ENDPOINTS =====================

router.get("/", async (req, res) => {
    try {
      const actions = await actionDb.get();
      res.status(200).json(actions);
    } catch (error) {
      res.status(500).json({ error: `Error 200: retrieving the projects` });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const action = await actionDb.get(req.params.id);
      action
        ? res.status(200).json(action)
        : res.status(404).json({
            message: `Error 404: The action with the id #${req.params.id} could not be found.`
          });
    } catch (error) {
      res.status(500).json({
        error: `Error 500: The action could not be found.`
      });
    }
  });
  
  router.post("/", async (req, res) => {
    try {
      const { project_id, description, notes } = req.body;
      if (!project_id) {
        res.status(404).json({
          message: "Error 404: The project id for this action could not be found."
        });
      }
      if (!notes || !description) {
        res.status(400).json({
          error: "Error 400: A name and description is required for this action."
        });
      } else {
        const action = await actionDb.insert(req.body);
        res.status(201).json(action);
      }
    } catch (error) {
      res.status(500).json({
        error: "Error 500: There was an error encountered saving the action."
      });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const count = await actionDb.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({
          message: "The action has been deleted."
        });
      } else {
        res.status(404).json({
          message: `Error 404: The action with id #${req.params.id} could not be found.`
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "Error 500: The action could not be removed."
      });
    }
  });
  
  router.put("/:id", async (req, res) => {
    try {
      const { project_id, notes, description } = req.body;
      const { id } = req.params;
      if (!project_id) {
        res.status(404).json({
          message: `Error 404: The project could not be found.`
        });
      }
      if (!notes || !description) {
        res.status(400).json({
          message: "Error 400: A notes and a description is required for this action"
        });
      } else {
        const action = await actionDb.update(id, req.body);
        res.status(200).json(action);
      }
    } catch (error) {
      res.status({
        error: `Error 500: The action information could not be updated.`
      });
    }
  });
  
  module.exports = router;