# ssh root@185.69.154.136 "
#     cd /home/saltycoin/api && 
#     git reset --hard &&
#     git pull origin master &&
#     npm run build &&
#     docker-compose -f docker-compose.stage.yml up -d &&
#     docker-compose restart
# "