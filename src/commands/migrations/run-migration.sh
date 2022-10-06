if [ $1 ]
then ./node_modules/.bin/nestjs-command database:migrate:one "$1"
else ./node_modules/.bin/nestjs-command database:migrate:all
fi