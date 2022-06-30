var mongoose = require('mongoose');
var db = require('../config/connection');

const { User, Thought } = require('../models');

const userSeeds = [
    {
        username: "gokublue007",
        email: "gokublue007@gmail.com",
    },
    {
        username: "tracye123",
        email: "tracye123@gmail.com",
    },
    {
        username: "rolly",
        email: "rolly2002@gmail.com",
    }
];

const thoughtSeeds = [
    {
        thoughtText: "This is my wild and crazy thought...",
        username: "gokublue007",
    },
    {
        thoughtText: "What is the meaning of life?",
        username: "tracye123",
    },
    {
        thoughtText: "Wake up you are dreaming!",
        username: "rolly",
    }
]

db.once('open', async () => {
    try {
        User.deleteMany({});
        Thought.deleteMany({});
        console.log('Collections Dropped Successfully!');

        await User.create(userSeeds);
        console.log("USER SEED SUCCESS");

        for (let seed of thoughtSeeds) {
            const addedThought = await Thought.create(seed);
            await User.findOneAndUpdate(
                { username: seed.username },
                {
                    $addToSet: {
                        thoughts: addedThought._id
                    }
                },
                { new: true }
            )
        }
        console.log("THOUGHT SEED SUCCESS")

        console.log('All seeds successfully inserted!');
		process.exit(0);

    } catch(err) {
        console.log(err);
        console.error(err);
		process.exit(1);
    }
})