import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();

// Register Route
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
			res.json({
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
			res.json({
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

		return res.status(201).json({
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

// Login Route
const login = async (req, res) => {
	// Search for user via email
	try {
		const foundUser = await prisma.user.findUnique({
			where: {
				email: req.body.email,
			},
		});

		if (!foundUser) {
			return res.json({ message: 'Incorrect email' });
		}

		// Check for password match
		const match = await bcrypt.compare(req.body.password, foundUser.password);

		// If they do not match, revert
		if (!match) {
			return res.json({
				message: 'Incorrect Password',
			});
		}

		const isMatch = await bcrypt.compare(req.body.password, foundUser.password);

		// If they match, sign with their JWT & log them in
		if (isMatch) {
			const signedJwt = jwt.sign(
				{
					id: foundUser.id,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: '1d',
				}
			);

			res.cookie('token', signedJwt, {
				httpOnly: true,
			});

			return res.status(200).json({
				status: 200,
				message: 'Success',
				user: foundUser,
				id: foundUser.id,
				signedJwt,
			});
		} else {
			return res.status(400).json({
				status: 400,
				message: 'Incorrect Login',
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: 500,
			message: 'Something went wrong; please try again.',
		});
	}
};

export { register, login };
