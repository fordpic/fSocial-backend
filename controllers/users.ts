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

// CREATE USER

// UPDATE USER

// DELETE USER
