import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Route for Formspree submission
  app.post("/api/submit", async (req, res) => {
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/xdardydq";

    try {
      const { name, email, phone, businessName, tier, budget, message } = req.body;

      // Forward to Formspree
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name || "Client",
          email: email || "",
          phone: phone || "",
          businessName: businessName || "",
          tier: tier || "",
          budget: budget || "",
          message: message || ""
        })
      });

      const data = await response.json();
      
      // Formspree returns status 200/201 on success or field errors on fail
      if (response.ok) {
        return res.status(200).json({
          success: true,
          message: "Form submitted successfully to Formspree!"
        });
      } else {
        console.error("Formspree rejected the submission:", data);
        return res.status(response.status).json({
          success: false,
          message: data.error || "Formspree submission failed. Please check your form endpoint configuration."
        });
      }
    } catch (error: any) {
      console.error("Backend contact form transmission error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error: Failed to transmit form submission. " + error.message
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CodyBrothers Full-Stack Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start CodyBrothers server:", err);
});
