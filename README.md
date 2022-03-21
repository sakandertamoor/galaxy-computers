

Fork this repository, then clone your fork, and run this in your newly created directory:

```bash
composer install
```

Next you need to make a copy of the `.env.example` file and rename it to `.env` inside your project root.

Run the following command to generate your app key:

```
php artisan key:generate
```

Then start your server:

```
php artisan serve
```

Your Laravel starter project is now up and running!

### Configure the starter project

Edit the `config/prismic.php` prismic configuration file to get the application connected to the correct repository:

```
'url' => 'https://your-repo-name.prismic.io/api/v2',
```

You may have to restart your server.

### Create your routes and pages

When the project is first launched and viewed, it will by default display a help page. Here you will find some documentation to help you get started with your Laravel project.

It includes an example that shows how to create a route and query a document of the custom type "page". It then shows how to integrate the content into the Laravel templates.

Check it out to get a better understanding of how you would create your own routes and templates for your project. You can also explore our documentation to learn more about how to [query the API](./docs/02-query-the-api/01-how-to-query-the-api.md) and how to integrate content fields like [Rich Text](./docs/03-templating/14-rich-text-and-title.md), [Images](./docs/03-templating/09-images.md), and more.

