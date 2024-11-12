import express from "express";
import {
    getUsers, 
    getById,
    createUser,
    updateUser,
    deleteUser

} from "../controllers/UserController.js"

const router = express.Router();

router.get('/legal', getUsers);
router.get('/legal/:id', getById);
router.post('/legal/', createUser);
router.patch('/legal/:id', updateUser);
router.delete('/legal/:id', deleteUser);


export default router;