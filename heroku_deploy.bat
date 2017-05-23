ng build --prod --aot --output-path client
git add .
git commit -m "heroku deploy"
git push heroku master
