import { Router } from"express";
import { enviarEmail } from"../controllers/emailController.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Email funciona");
});
router.post("/:correo", enviarEmail)
export default router;