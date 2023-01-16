composer require laravel/ui
php artisan ui:auth

npm install --save-dev vite laravel-vite-plugin
npm install --save-dev @vitejs/plugin-vue

composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

app/Http/Kernel.php file:
'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],

config/cors: 'supports_credentials' => true,
