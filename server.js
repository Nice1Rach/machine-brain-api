const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'postgres',
		password : '1loveyouJoshandLuke#',
		database : 'machine_brain'
	}
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

const database = {
	users: [
		{
			id: '123',
			name: 'Anne',
			password: 'cookies',
			email: 'anne@gmail.com',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Rachel',
			password: 'burgers',
			email: 'rachel@gmail.com',
			entries: 0,
			joined: new Date()
		}
	],
	login: [
	{ 
		id: '126',
		hash: '',
		email: 'luke@gmail.com'
	}
	]	
}

app.get('/', (req, res) => { res.send('success') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db,bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3000, () => {
	console.log('app is running smoothly on port 3000');
})