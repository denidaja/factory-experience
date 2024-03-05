#!/bin/bash

# Function to get auth token given email and password
get_auth_token() {
  local email=$1
  local password=$2
  local response=$(curl -s -c cookies.txt --request POST \
    --url http://localhost/api/v1/auth/login \
    --header 'Content-Type: application/json' \
    --data "{
      \"email\": \"$email\",
      \"password\": \"$password\"
    }")

  echo $response | jq -r '.access_token'
}

# Login with two users, get access tokens
authToken1=$(get_auth_token "user0@example.com" "1234")
authToken2=$(get_auth_token "user1@example.com" "1234")

# Function to send volunteer submission request
send_volunteer_submission() {
  local authToken=$1
  local supportRequestId=$2
  local outputFile=$3

  # Use curl to post volunteer submission and capture response in a file
  curl --request POST \
    --url http://localhost/api/v1/volunteer-submissions \
    --header "Authorization: Bearer $authToken" \
    --header 'Content-Type: application/json' \
    --data "{
      \"support_request_id\": \"$supportRequestId\"
    }" -w "%{http_code}" -o $outputFile
}

# Send volunteer submissions in parallel for the same support request
supportRequestId="705ace57-8620-4734-8418-6b596657f615"
tempFile1=$(mktemp)
tempFile2=$(mktemp)

send_volunteer_submission "$authToken1" "$supportRequestId" "$tempFile1" &
pid1=$!
send_volunteer_submission "$authToken2" "$supportRequestId" "$tempFile2" &
pid2=$!

# Wait for both parallel processes to finish
wait $pid1
wait $pid2

# Output responses
echo "Response 1: $(cat $tempFile1)"
echo "Response 2: $(cat $tempFile2)"

# Cleanup temporary files
rm "$tempFile1"
rm "$tempFile2"
