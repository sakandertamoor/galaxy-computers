

Fork this repository, then clone your fork, and run this in your newly created directory:

```bash
composer install
```

Next you need to make a copy of the `.env.example` file and rename it to `.env` inside your project root.

```
cp .env.example .env
```

Add Database credentials and Database name in `.env` file.
![image](https://user-images.githubusercontent.com/7387606/159254874-46becbed-8320-4771-827e-e165c1f49d61.png)


Run the following command to generate your app key:

```
php artisan key:generate
```

Run the following command to link the storage:

```
php artisan storage:link
```

Run the following command for `Migration` and `Seeds`:

```
php artisan migrate:refresh --seed
```


Then start your server:

```
php artisan serve
```

