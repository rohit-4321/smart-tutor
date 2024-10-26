from .. import mongo;
def create_group(name: str):

    result = mongo.db.groups.insert_one({
            "name": name
        })
    return result


def get_all_groups():
    result = mongo.db.groups.find()
    return result;
