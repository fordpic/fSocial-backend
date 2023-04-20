import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET ALL COMMENTS
router.get('/', async (req, res) => {
	const comments = await prisma.comment.findMany();
	res.json(comments);
});

// GET COMMENT BY ID
router.get('/:id', async (req, res) => {
	const comment = await prisma.comment.findUnique({
		where: { id: Number(req.params.id) },
	});

	res.json({ comment });
});

// CREATE COMMENT
router.post('/create', async (req, res) => {
	const newComment = await prisma.comment.create({
		data: req.body,
	});

	res.json({ message: 'New comment created', comment: newComment });
});

// UPDATE COMMENT
router.put('/:id', async (req, res) => {
	const updatedComment = await prisma.comment.update({
		where: { id: Number(req.params.id) },
		data: req.body,
	});

	res.json({
		message: 'Comment has been updated successfully',
		comment: updatedComment,
	});
});

// DELETE COMMENT
router.delete('/:id', async (req, res) => {
	const deletedComment = await prisma.comment.delete({
		where: { id: Number(req.params.id) },
	});

	res.json({
		message: 'Comment has been deleted successfully',
		comment: deletedComment,
	});
});

export default router;
