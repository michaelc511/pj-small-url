import { Request, Response } from "express";
var validUrl = require('valid-url');
import Url from "../model/urlModel";

// For posting data into database
export const create = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // create urlData
    const urlData = new Url(req.body);
    const { full } = urlData;
    const urlExists = await Url.findOne({ full });

    if (urlExists) {
      res
        .status(400)
        .json({ error: "URL already exists" });
      return;
    }
console.log('full', full);

    if(!validUrl.isUri(full)){
      res
        .status(400)
        .json({ error: "Invalid URL" });
      return;
    }

    const savedUrl = await urlData.save();
    res.status(200).json(savedUrl);
  } catch (err: any) { 
    res
      .status(500)
      .json({
        error: "Internal Server Error" + err.message,
      });
  }
};

// For getting data from database
export const fetch = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const urls = await Url.find();

    if (urls.length === 0) {
      res.status(404).json({ message: "URLs not found" });
      return;
    }

    res.status(200).json(urls);
  } catch (err: any) { 
    res
      .status(500)
      .json({
        error: "Internal Server Error" + err.message,
      });
  }
};

// // For updating data in database
export const update = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // id
    const id = req.params.id;

    // urlData
    const urlData = new Url(req.body);
    const { full } = urlData;

    // verify if it exists in DB
    const urlExist = await Url.findOne({ _id: id });

    if (!urlExist) {
      res
        .status(404)
        .json({ message: "URL is not found" });
      return;
    }

    // verify if the url full is valid
    if(!validUrl.isUri(full)){
      res
        .status(400)
        .json({ error: "Invalid URL" });
      return;
    }

    const updateUrl = await Url.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(201).json(updateUrl);
  } catch (err: any) { 
    res
      .status(500)
      .json({
        error: "Internal Server Error" + err.message,
      });
  }
};

// // For deleting data from database
export const deleteUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const urlExist = await Url.findOne({ _id: id });

    if (!urlExist) {
      res.status(404).json({ message: "Url Not Found." });
      return;
    }

    await Url.findByIdAndDelete(id);
    res
      .status(201)
      .json({ message: "Url deleted Successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error." });
  }
};
