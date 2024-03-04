import express, { Router } from "express";
import {
  create,
  fetch,
  update,
  deleteUrl,
} from "../controller/urlController";

const route: Router = express.Router();

route.get("/getallurls", fetch);
route.post("/create", create);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteUrl);

export default route;
