API="http://localhost:4741"
URL_PATH="/files"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "data": {
      "title": "'"${TITLE}"'",
      "url": "'"${URL}"'",
      "tags": "'"${TAGS}"'",
      "user": "'"${USER}"'"
    }
  }'

echo
