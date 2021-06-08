#exports a list to txt in JSON
new_address = []
with open('new_addresses.txt', 'w') as f:
        json.dump(new_address, f)
