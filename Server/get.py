import json
import requests


def lambda_handler(event, context):
    # TODO implement
    data = requests.get(
        "https://vtyhed13i2.execute-api.us-east-1.amazonaws.com/bom/")
    items = []
    for x in data.json():
        if x['fields']['bom'] == int(event['pathParameters']['bom_id']):
            items.append(x)
    return {
        'statusCode': 200,
        'body': json.dumps({"items": items})
    }
