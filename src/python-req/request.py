import sys
import requests
import json


def jprint(obj):
    # create a formatted string of the Python JSON object
    text = json.dumps(obj, sort_keys=True, indent=1)
    print(text)


username = "walter12"
password = "Olivier0?"


data = {
    'recipients': sys.argv[1],
    'message'	: sys.argv[2],
    'sender': sys.argv[3]
}


r = requests.post('https://www.intouchsms.co.rw/api/sendsms/.json',
                  data, auth=(username, password))

jprint(r.json())
