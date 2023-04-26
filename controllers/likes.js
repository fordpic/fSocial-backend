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
router.get('/:postId', async (req, res) => {
	const like = await prisma.like.findUnique({
		where: { id: Number(req.params.postId) },
	});

	res.json({ like });
});

// CREATE LIKE ON POST
router.post('/create/:postId', async (req, res) => {
	const newLike = await prisma.like.create({
		data: {
			value: 1,
			post: {
				connect: {
					id: Number(req.params.postId),
				},
			},
			author: {
				connect: {
					id: req.currentUser,
				},
			},
		},
	});

	res.json({ message: 'Successfully liked post', like: newLike });
});

// CREATE LIKE ON COMMENT = TODO LATER
// router.post('/create/:commentId', async (req, res) => {
// 	const newLike = await prisma.like.create({
// 		data: {
// 			value: 1,
// 			post: {
// 				connect: {
// 					id: Number(req.params.commentId),
// 				},
// 			},
// 			author: {
// 				connect: {
// 					id: req.currentUser,
// 				},
// 			},
// 		},
// 	});

// 	res.json({ message: 'Successfully liked comment', like: newLike });
// });

// DELETE LIKE
router.delete('/:postId', async (req, res) => {
	const deletedLike = await prisma.like.delete({
		where: { id: Number(req.params.postId) },
	});

	res.json({
		message: 'Like has been deleted successfully',
		like: deletedLike,
	});
});

export default router;
