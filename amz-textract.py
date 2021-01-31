import boto3
import io
from io import BytesIO
import sys
import re
import csv, json
from num2words import num2words
import requests

s3 = boto3.client('s3', region_name = "us-east-1")
client = boto3.client('textract', region_name = "us-east-1")
bucket = 'amz-textract'

def convertToDict(csvFilePath, jsonFilePath):
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

	return data

def grab_files():
    response = s3.list_objects_v2(
    Bucket = bucket,
    )
    
    response = response['Contents']
    images = []
    for key in range(len(response)):
        images.append(response[key]['Key'])

    return images

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
    ignore_chars = [';', ':', '!', "*", ']', "[" , '"', "{" , "}", "(", ")", "'", ",", "$ ", "$"]
    extractedData = []
    for item in block:
        if item["BlockType"] == "LINE":
            result.append(item["Text"]) #result list for index hard-coding (find better way) ((not needed?))
            result_str += item["Text"] + " "  #result string for regex filtering

    # print(result_str, "\n")
    #Filtering result to find the date in mm/dd/yyyy and mm-dd-yyyy format
    date_str = str(re.findall('(\d{1,2}?-\d{1,2}?-\d{1,4})|(\d{1,2}?/\d{1,2}?/\d{1,4})', result_str))
    date_str = date_str.split(" ")
    date_str = str(date_str[1])
    #Removing specific characters
    for i in ignore_chars:
        date_str = date_str.replace(i, "")

    # print(date_str)

    #Getting amount of check as integers (in-progress)
    amount_regex = re.search(r"[$]+[\s]+[0-9,]+(.[0-9]{0,})?|[$]+[\s]+[0-9]+(.[0-9]{0,2})?|[$]+[0-9,]+(.[0-9]{1,2})?", result_str)
    amount_str = amount_regex.group(0)

    #Removing specific characters
    for i in ignore_chars:
        amount_str = amount_str.replace(i, "")
    
    for j in amount_str:
        if j == " ":
            amount_str = amount_str.replace(j, "")

    amount_float = float(amount_str)
    amount_float = ("{:.2f}".format(amount_float))

    #Getting amount of check in words
    amount_in_words = num2words(amount_float)

    # print(amount_in_words)
    extractedData.append(date_str)
    extractedData.append(amount_in_words)
    extractedData.append(amount_float)
    
    return extractedData

def auth(file, auth_key, extractedData):
    csvfile = file
    valid = csvfile[auth_key]
    image_name = valid['Path']
    validated_data = [valid['Date'], valid['Amount in word form'], valid['Amount in number form']]
    # print(f"\nValidation data from csv for file {image_name}: ", "\nDate: " + validated_data[0], "\nAmount in words: " + validated_data[1] , "\nAmount in digits: " + validated_data[2] + "\n")
    # print("Extracted data from image: ", extractedData)
    # x = 0
    # for x in range(len(validated_data)):
    #     if extractedData[x] != validated_data[x]:
    #         print(f"File {image_name} " + extractedData[x] + " is not validated\n")
    #     else:
    #         print(f"File {image_name} " + extractedData[x] + " was validated successfully\n")
                
                

def testAllChecks(csvFile):
    checks = grab_files()
    file = 0
    for file in range(len(checks)):
        document = checks[file]
        print(f"Running test on file {document}")
        checkData = text(client, bucket, document)
        extractedCheckData = detectText(checkData)
        auth(csvFile, document, extractedCheckData)
            
        
def main():
    # Decide the two file paths according to your 
    # computer system
    csvFilePath = r'data.csv'
    jsonFilePath = r'dataJSON.json'
    csvData = convertToDict(csvFilePath, jsonFilePath)  
    
    # document = ''
    # data = text(client, bucket, document)
    # extractedData = detectText(data)
    # auth(csvData, document, extractedData)
    
    # s3.delete_object(
    #     Key='check_59.png', 
    #     Bucket='amz-textract')
    
    testAllChecks(csvData)
    print("All images extracked successfully")
    
    

main()