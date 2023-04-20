import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET ALL LIKES
router.get('/', async (req, res) => {
	const likes = await prisma.like.findMany();
	res.json(likes);
});

// GET LIKE BY ID
router.get('/:id', async (req, res) => {
	const like = await prisma.like.findUnique({
		where: { id: Number(req.params.id) },
	});

	res.json({ like });
});

// CREATE LIKE
router.post('/create', async (req, res) => {
	const newLike = await prisma.like.create({
		data: req.body,
	});

	res.json({ message: 'Successfully liked', like: newLike });
});

// DELETE LIKE
router.delete('/:id', async (req, res) => {
	const deletedLike = await prisma.like.delete({
		where: { id: Number(req.params.id) },
	});

	res.json({
		message: 'Like has been deleted successfully',
		like: deletedLike,
	});
});

export default router;
