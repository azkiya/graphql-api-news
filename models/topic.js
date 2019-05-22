var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TopicSchema = new Schema ({
	name: String
});

export default mongoose.model('Topic', TopicSchema);