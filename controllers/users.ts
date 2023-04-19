import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET ALL USERS
router.get('/', async (req, res) => {
	const users = await prisma.user.findMany();
	res.json(users);
});

// GET USER BY ID
router.get('/:id', async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: Number(req.params.id),
		},
	});

	res.json({ user });
});

// CREATE USER w/ msg response
router.post('/create', async (req, res) => {
	const newUser = await prisma.user.create({
		data: req.body,
	});

	res.json({ message: 'New user created', user: newUser });
});

// UPDATE USER
router.put('/update/:id', async (req, res) => {
	const updatedUser = await prisma.user.update({
		where: { id: Number(req.params.id) },
		data: req.body,
	});

	res.json(updatedUser);
});

// DELETE USER
router.delete('/:id', async (req, res) => {
	const deletedUser = await prisma.user.delete({
		where: { id: Number(req.params.id) },
	});

	res.json(deletedUser);
});

export default router;
