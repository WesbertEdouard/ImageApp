import boto3
import io
from io import BytesIO
import sys
import re
import csv, json

# Function to convert a CSV to JSON
# Takes the file paths as arguments
def convertToJSON(csvFilePath, jsonFilePath):
	
	# create a dictionary
	data = {}
	
	# Open a csv reader called DictReader
	with open(csvFilePath, encoding='utf-8') as csvf:
		csvReader = csv.DictReader(csvf)
		
		# Convert each row into a dictionary 
		# and add it to data
		for rows in csvReader:
			
			# Assuming a column named 'No' to
			# be the primary key
			key = rows['Path']
			data[key] = rows

	# Open a json writer, and use the json.dumps() 
	# function to dump data
	with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
		jsonf.write(json.dumps(data, indent=4))
	return data

def auth():
    
    # json[file_name]['Amount in word form'] == 
    
    pass


def text(client, bucket,document):
    response = client.detect_document_text(
    Document={
        'S3Object': {
            'Bucket': bucket,
            'Name': document,
        }
    }
)
    return response

def detectText(data):
    block = data['Blocks']
    result=[]
    result_str = ""
    bad_chars = [';', ':', '!', "*", ']', "[" , '"', "{" , "}", "(", ")", "'", ",", "."]

    for item in block:
        if item["BlockType"] == "LINE":
            result.append(item["Text"]) #result list for index hard-coding (find better way)
            result_str += item["Text"] + " "  #result string for regex filtering

    print(result_str)
    # print(result_str)

    #Getting amount of check in words (in-progress)
    amount_str = result[8]

    for i in bad_chars:
        amount_str = amount_str.replace(i, "")
    print(amount_str)

    #Filtering result to find the date in mm/dd/yyyy and mm-dd-yyyy format
    date_str = str(re.findall('$[\s]([1-9]\d*)(.\d\d)?(?![\d.])(?=\s|$)', result_str))

    for i in bad_chars:
        date_str = date_str.replace(i, "")

    print(date_str)



def main():
    # Decide the two file paths according to your 
    # computer system
    csvFilePath = r'data.csv'
    jsonFilePath = r'dataJSON.json'
    client = boto3.client('textract', region_name = "us-east-1")
    bucket = 'amz-textract'
    document = 'image_36.jpg'
    data = text(client, bucket, document)
    detectText(data)
    convertToJSON(csvFilePath, jsonFilePath)


main()

