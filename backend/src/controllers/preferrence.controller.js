import Preferrence from "../models/preferrence.model.js";

import { sanitizeContactData } from "../utils/sanitize.js";

export const getPreferrences = async (req, res) => {
  try {
    const preferrences = await Preferrence.find();
    res.status(200).json(preferrences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPreferrence = async (req, res) => {
  try {
    const { fullName, email, phone, job_title, company } = req.body;

    // Sanitize input to prevent XSS attacks
    // const sanitizedData = sanitizeContactData({ fullName, email, phone, job_title, company });

    // let err = [];
    // let errVal = [];
    // if (!sanitizedData.fullName) { 
    //     err.push("Full name is required"); 
    //     errVal.push(fullName); 
    // }

    // if (!sanitizedData.email) { 
    //     err.push("Email is required"); 
    //     errVal.push(email); 
    // }

    // if (!sanitizedData.phone) { 
    //     err.push("Phone is required"); 
    //     errVal.push(phone); 
    // }

    // if (!sanitizedData.job_title) { 
    //     err.push("Job title is required"); 
    //     errVal.push(job_title); 
    // }

    // if (!sanitizedData.company) { 
    //     err.push("Company is required"); 
    //     errVal.push(company); 
    // }

    // if (err.length > 0 || errVal.length > 0) {
    //   return res.status(400).json({ status: "error", message: "Please fill in the required fields", err, errVal });
    // }
    const preferrence = await Preferrence.create({ fullName, email, phone, job_title, company });
    res.status(201).json({ status: "success", message: "Preferrence created successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const updatePreferrence = async (req, res) => {
  try {
    const { fullName, email, phone, job_title, company } = req.body;
    // Sanitize input to prevent XSS attacks
    
    let err = [];
    let errVal = [];
    if (!fullName) { err.push("Full name is required"); errVal.push(fullName); }
    if (!email) { err.push("Email is required"); errVal.push(email); }
    if (!phone) { err.push("Phone is required"); errVal.push(phone); }
    if (!job_title) { err.push("Job title is required"); errVal.push(job_title); }
    if (!company) { err.push("Company is required"); errVal.push(company); }
    if (err.length > 0 || errVal.length > 0) {
      return res.status(400).json({ status: "error", message: "Please fill in the required fields", err, errVal });
    }
    const preferrence = await Preferrence.findByIdAndUpdate(req.params.id, { fullName, email, phone, job_title, company }, { new: true });
    res.status(200).json({ status: "success", message: "Preferrence updated successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const deletePreferrence = async (req, res) => {
  try {
    const preferrence = await Preferrence.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", preferrence, message: "Preferrence deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
