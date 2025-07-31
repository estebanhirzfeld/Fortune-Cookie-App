<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:8000',
        'http://127.0.0.1:8000',
        'http://localhost:5500',
        'http://127.0.0.1:5500',
    ],
    'allowed_headers' => ['*'],
    'supports_credentials' => false,
];
