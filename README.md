# AValcohol [![Build Status](https://travis-ci.com/feeekkk/AValcohol.svg?token=crFjMNDDdzj4qoYgDDWv&branch=master)](https://travis-ci.com/feeekkk/AValcohol)
##Initliazing this project locally:
1. clone this repo
2. open up terminal and navigate to the cloned repo
3. type `bower install` to install the front-end dependencies (make sure you have bower installed first)
4. type `php composer.phar install` (make sure you have composer installed first)

##Current Deploy Process To dev.avalcohol.com
1. push changes to the *dev* branch on this repo, the rest will be handled magically by travis
2. ssh onto server and cd to www/dev
3. edit .env if necessary
4. php artisan migrate if there are any migrations needing to be ran

##Current Production Deploy Process To avalcohol.com
1. test on dev first.
2. merge into master and git push
3. travis will test / build everything and then will commit and push all of the built code to AValcohol-production
4. ssh onto server and run `php artisan down` to put the site into maintenance mode
5. run the necessary migrations on the LIVE db `php artisan migrate`
7. update code `git pull`
8. update .env or anything else
9. run tests `phpunit`
10. test making an order etc.
11. `php artisan up`
12. watch error logs
