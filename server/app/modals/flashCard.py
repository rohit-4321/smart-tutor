from app import mongo
from schema.quiz import Quiz
from bson.objectid import ObjectId
from datetime import datetime, timezone

from schema.flashCard import AddCardPayload, CreateFlashCardPayload, UpdateDeckResultPayload

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


def db_add_card(user_id: str, deck_id: str, card: AddCardPayload):
    card['_id'] = str(ObjectId())
    print(user_id)
    result = mongo.db.deck.update_one(
        {"_id": ObjectId(deck_id), "user_id": user_id},
        {"$push": {"cards": card}}
    )
    print(result)

    return result;


def db_get_cards(user_id: str, deck_id: str):
    document = mongo.db.deck.find_one(
    {"_id": ObjectId(deck_id), "user_id": user_id},
    {"cards": 1})
    return document



def db_update_card(user_id, deck_id, card_id, card):
    # del card["_id"]
    update_object = {
        f"cards.$[elem].{key}": value
        for key, value in card.items()
    }
    print('asdadsdas')
    print(str(update_object))

    # Update the card where the card_id matches, using array filters
    result = mongo.db.deck.update_one(
        {"_id": ObjectId(deck_id), "user_id": user_id},
        {"$set": update_object},
        array_filters=[{"elem._id": card_id}] 
    )
    return result


def db_update_deck_score(user_id, deck_id, payload: UpdateDeckResultPayload):
    payload['last_attempt_at'] = datetime.now(timezone.utc)

    result = mongo.db.deck.update_one(
        {"_id": ObjectId(deck_id), "user_id": user_id},
        {"$set": payload }
    )
    return result