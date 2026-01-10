import { MongoClient } from 'mongodb';

// **************************************************************************
// Create Expiration Index
// **************************************************************************
export const createExpIndex = async (collection, key = "timestamp", expDays = 1) => {
    const indexName = `${key}_exp`;

    try {
        await collection.createIndex(
            { [key]: 1 },
            {
                name: indexName,
                expireAfterSeconds: expDays * 86400
            }
        )
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        try {
            await collection.dropIndex(indexName);
            collection.createIndex(
                { [key]: 1 },
                {
                    name: indexName,
                    expireAfterSeconds: expDays * 86400
                }
            )
        } catch (err2) {
            console.error(err2);
        }
    }
}

// **************************************************************************
// Create Standard Index
// **************************************************************************
export const createStandardIndex = async (collection, indexName, indexDef = {}, options = {}) => {
    let indexExists = false;
    try {
        try {
            const indexes = await collection.listIndexes().toArray();
            indexExists = indexes.some(idx => idx.name === indexName);
        } catch (inner) {
            // Namespace not found (first creation) => treat as non-existent, proceed to create
            if (!(inner && inner.code === 26)) {
                console.error(inner);
            }
        }
        if (!indexExists) {
            await collection.createIndex(
                indexDef,
                {
                    name: indexName,
                    background: true,
                    ...options
                }
            );
        }
    } catch (err) {
        console.error(err);
    }
};

// **************************************************************************
// Create Vector Index
// **************************************************************************
export const createVectorIndex = async (collection, key = "embedding") => {
    const indexName = `${key}_vector`
    const indexes = await collection.listIndexes().toArray();
    const indexExists = indexes.some(idx => idx.name === indexName);

    if (!indexExists) {
        const index = {
            name: indexName,
            type: "vectorSearch",
            definition: {
                "fields": [
                    {
                        "type": "vector",
                        "numDimensions": 3072,
                        "path": key,
                        "similarity": "cosine"
                    }
                ]
            }
        };

        await collection.createSearchIndex(index);
    }
};

// **************************************************************************
// Connect to MongoDB
// **************************************************************************
export const client = await MongoClient.connect(process.env.MONGO_URI, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    maxIdleTimeMS: 30000
});
export const db = client.db(process.env.MONGO_DB_NAME);

db.collections = {
    accounts: db.collection("accounts"),
    sessions: db.collection("sessions")
};

await createExpIndex(db.collections.sessions, 'timestamp', 0.5);

console.log(`Connected to MongoDB at ${process.env.MONGO_URI}`);