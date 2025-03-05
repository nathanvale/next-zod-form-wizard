import { NextApiRequest, NextApiResponse } from "next";
import { f2Schema } from "#lib/forms/f2";
import { validateFormData } from "#lib/forms/shared/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const formData = req.body;

    // Simulate saving data to a database or external service
    try {
      // Replace this with actual saving logic
      console.log("Saving form data:", formData);
      return res
        .status(200)
        .json({ message: "Form data submitted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to save form data" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
