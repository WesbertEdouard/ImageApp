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
bucket = 'citi-hackathon-webapp-images'

def convertToDict(csvFilePath, jsonFilePath):
    # Create a dictionary
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
            result.append(item["Text"])
            result_str += item["Text"] + " "  #result string for regex filtering

    print(result_str, "\n")

    #Filtering result to find the date in mm/dd/yyyy and mm-dd-yyyy format
    date_str = str(re.findall('(\d{1,2}?-\d{1,2}?-\d{1,4})|(\d{1,2}?/\d{1,2}?/\d{1,4})', result_str))

    #Removing specific characters
    for i in ignore_chars:
        date_str = date_str.replace(i, "")

    #Removing any white spaces
    for j in date_str:
        if j == " ":
            date_str = date_str.replace(j, "")

    print("Date: " + date_str)

    #Getting amount of check as integers (in-progress)
    amount_regex = re.search(r"[$]+[\s]+[0-9,]+(.[0-9]{0,})?|[$]+[\s]+[0-9]+(.[0-9]{0,2})?|[$]+[0-9,]+(.[0-9]{1,2})|[^:\s]+([0-9]\.)+(.[0-9]{1,2})?", result_str)
    amount_str = amount_regex.group(0)

    #Removing specific characters
    for i in ignore_chars:   
        amount_str = amount_str.replace(i, "")
    
    #Removing any white spaces
    for j in amount_str:
        if j == " ":
            amount_str = amount_str.replace(j, "")

    #Formatting
    amount_float = float(amount_str)
    amount_float = ("{:.2f}".format(amount_float))
    print("Digit grabbed : " + amount_float)

    #Getting amount of check in words
    amount_in_words = num2words(amount_float)

    print("Amount in words: " + amount_in_words + "\n")

    # print(amount_in_words)
    extractedData.append(date_str)
    extractedData.append(amount_in_words)
    extractedData.append(amount_float)

    print(extractedData, "\n")

    result_dict = {
        'statusCode': 200,
        'Date': extractedData[0],
        'WordAmount': extractedData[1],
        'NumAmount': extractedData[2]
    }

    convertJSON = json.dumps(result_dict)
    print(convertJSON)
    
    return convertJSON


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
    #         print(f"File {image_name} " + extractedData[x] + " is not validated")
    #     else:
    #         print(f"File {image_name} " + extractedData[x] + " was validated successfully")
    # print("\n")
                
#Testing function
def testAllChecks(csvFile):
    checks = grab_files()
    file = 0
    for file in range(len(checks)):
        document = checks[file]
        print(f"Running test on file {document}")
        checkData = text(client, bucket, document)
        try:
            extractedCheckData = detectText(checkData)
        except ValueError as value_error:
            print(value_error)
            print("Non-numeric characters are invalid.")
        except AttributeError as attr_error:
            print(attr_error)
            print("Error detecting dollar amount.")
        except IndexError as index_error:
            print(index_error)
            print("Error indexing date amount.")
            
        else:
            auth(csvFile, document, extractedCheckData)
            
def write_json(data, filename): 
    f = open(filename, "r")    
    # with is like your try .. finally block in this case
    with f as file:
        # read a list of lines into data
        text = file.readlines()

    # now change the 2nd line, note that you have to add a newline
    text[1] = (f"{data},\n")
   
    

    # and write everything back
    with open(filename, 'w') as file:
        file.writelines( text )
    
def reset_json(file):
    name = file
    f = open(file, "r")    
    # with is like your try .. finally block in this case
    with f as file:
        # read a list of lines into data
        text = file.readlines()

    # now change the 2nd line, note that you have to add a newline
    text[1] = ("\n")



    # and write everything back
    with open(name, 'w') as file:
        file.writelines( text )
 
def main():
    # Decide the two file paths according to your 
    # computer system
    # csvFilePath = r'ImageApp\data.csv'
    # jsonFilePath = r'dataJSON.json'
    # csvData = convertToDict(csvFilePath, jsonFilePath)  
    # document = ''
    # data = text(client, bucket, document)
    # extractedData = detectText(data)
    # auth(csvData, document, extractedData)
    # s3.delete_object(
    #     Key='check_59.png', 
    #     Bucket='amz-textract')
    # testAllChecks(csvData)
    list = []
    text(client, bucket, "check_1.png")
    
    # for item in test_single["Blocks"]:
    #     if item["BlockType"] == "LINE":
    #         list.append((item["Text"] ))
    # print(list)
    # print(test_single)
    # test_var = detectText(test_single)
    # write_json(test_var, 'src\checkJSON.js')
    # reset_json('src\checkJSON.js')




main()