import boto3
import io
from io import BytesIO
import sys
import re
from num2words import num2words

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


def main():
    client = boto3.client('textract', region_name = "us-east-2")
    bucket = 'mytextracttestbucket'
    document = 'check_41.png'
    output = text(client, bucket, document)
    block = output['Blocks']
    result=[]
    result_str = ""
    ignore_chars = [';', ':', '!', "*", ']', "[" , '"', "{" , "}", "(", ")", "'", ",", "$ "]
    
    for item in block:
        if item["BlockType"] == "LINE":
            result.append(item["Text"]) #result list for index hard-coding (find better way) ((not needed?))
            result_str += item["Text"] + " "  #result string for regex filtering
            

    #Getting amount of check as integers (in-progress)
    amount_regex = re.search(r"[$]+[\s]+[0-9,]+(.[0-9]{1,2})?|[$]+[\s]+[0-9]+(.[0-9]{0,2})?", result_str)
    amount_str = amount_regex.group(0)

    #Removing specific characters
    for i in ignore_chars:
        amount_str = amount_str.replace(i, "")

    amount_float = float(amount_str)
    print("{:.2f}".format(amount_float))

    #Filtering result to find the date in mm/dd/yyyy and mm-dd-yyyy format
    date_str = str(re.findall('(\d{1,2}?\-\d{1,2}?\-\d{1,4})|(\d{1,2}?\/\d{1,2}?\/\d{1,4})', result_str))

    #Removing specific characters
    for i in ignore_chars:
        date_str = date_str.replace(i, "")

    print(date_str)

    
    #Getting amount of check in words
    amount_in_words = num2words(amount_float)

    print(amount_in_words)


if __name__ == "__main__":
    main()
