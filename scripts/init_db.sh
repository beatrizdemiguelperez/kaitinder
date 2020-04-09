echo "Initializating MongoDB"

docker-compose up -d

sleep 5

echo "\n\n*** POPULATE MONGO FROM DEV DB ***"
echo "\n*** DUMP DEVELOPMENT DB ***"
BACKUP_NAME="backup_$(date +%m_%d_%Y_%H%M:%SZ)"

# # DEV
docker-compose exec -T mongo sh -c "mongodump --uri='mongodb+srv://admin:kaitinder@cluster0-mrwp6.mongodb.net/kaitinder' --gzip --archive=/data/backup/Dev_$BACKUP_NAME.archive"
echo "\n*** RESTORE LOCAL DB ***\n"
docker-compose exec -T mongo sh -c "mongorestore --drop --gzip --archive=/data/backup/Dev_$BACKUP_NAME.archive"
echo "\n**DB MIGRATION COMPLETED**\n"

docker-compose down
