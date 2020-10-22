import json
import requests
from datetime import datetime


def lambda_handler(event, context):
    body = json.loads(event['body'])
    uuid = event['pathParameters']['bomitem_id']
    amount = body['amount']

    data = requests.get(
        "https://vtyhed13i2.execute-api.us-east-1.amazonaws.com/bom/")
    items = []
    for x in data.json():
        if x['fields']['uuid'] == uuid:
            x['fields']['quantity'] = amount
            x['fields']['updated_at'] = str(datetime.now())
            items.append(x)

    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps({"items": items})
    }
