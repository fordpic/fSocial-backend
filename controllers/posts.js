import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET ALL POSTS
router.get('/', async (req, res) => {
	const posts = await prisma.post.findMany();
	res.json(posts);
});

// GET POST BY ID
router.get('/:id', async (req, res) => {
	const post = await prisma.post.findUnique({
		where: { id: Number(req.params.id) },
	});

	res.json({ post });
});

// CREATE POST
router.post('/create', async (req, res) => {
	const newPost = await prisma.post.create({
		data: req.body,
	});

	res.json({ message: 'New post created', post: newPost });
});

// UPDATE POST
router.put('/:id', async (req, res) => {
	const updatedPost = await prisma.post.update({
		where: { id: Number(req.params.id) },
		data: req.body,
	});

	res.json({
		message: 'Post has been updated successfully',
		post: updatedPost,
	});
});

// DELETE POST
router.delete('/:id', async (req, res) => {
	const deletedPost = await prisma.post.delete({
		where: { id: Number(req.params.id) },
	});

	res.json({
		message: 'Post has been deleted successfully',
		post: deletedPost,
	});
});

export default router;
