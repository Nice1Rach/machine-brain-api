const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'f434a96fd2e34349948f31318b9b87d2'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (db) => (req, res) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
};