import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();

const register = async (req, res) => {
	console.log(req.body.email);

	try {
		// See if user exists first
		const userEmail = await prisma.user.findUnique({
			where: {
				email: req.body.email,
			},
		});

		if (userEmail) {
			response.json({
				message: 'This email address already exists.',
			});
		}

		// Make sure chosen username doesn't exist already
		const foundUsername = await prisma.user.findUnique({
			where: {
				username: req.body.username,
			},
		});

		if (foundUsername) {
			response.json({
				message: 'Username already exists.',
			});
		}

		// Generate Salt
		const salt = await bcrypt.genSalt(10);

		// Hash the given password
		const hash = await bcrypt.hash(req.body.password, salt);

		// Create new user with given info & hashed password
		const createdUser = await prisma.user.create({
			data: {
				...req.body,
				password: hash,
			},
		});

		return response.status(201).json({
			status: 201,
			message: 'success',
			createdUser,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: 500,
			message: 'Something has gone wrong; please try again.',
		});
	}
};
