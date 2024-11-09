from app import mongo
from schema.quiz import Quiz
from bson import ObjectId
from datetime import datetime, timezone

from schema.flashCard import CreateFlashCardPayload

def db_insert_deck(deck: CreateFlashCardPayload, user_id: str):

    result = mongo.db.deck.insert_one({
        **deck,
        "created_at": datetime.now(timezone.utc),
        "last_updated_at": datetime.now(timezone.utc),
        'user_id': user_id
    })
    return result



def db_get_decks(user_id: str):
    pipeline = [
        {
            "$match": {
                "user_id": user_id,
            }
        },
        {
            "$addFields": {
                "_id": { "$toString": "$_id" },
                "cards_count": { "$size": "$cards" } 
            }
        },
        {
        "$project": {
            "cards": 0,
            'user_id': 0
        }
    }
    ]
    result = list(mongo.db.deck.aggregate(pipeline));
    return result;

