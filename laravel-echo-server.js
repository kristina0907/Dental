let echo = require('laravel-echo-server');

echo.run(
    {
        "authHost": "http://localhost:8000",
        "authEndpoint": "/api/auth/user",
        "clients": [],
        "database": "redis",
        "databaseConfig": {
            "redis": {},
            "sqlite": {
                "databasePath": "/database/laravel-echo-server.sqlite"
            }
        },
        "devMode": true,
        "host": null,
        "port": "6001",
        "protocol": "http",
        "socketio": {},
        "secureOptions": 67108864,
        "sslCertPath": "",
        "sslKeyPath": "",
        "sslCertChainPath": "",
        "sslPassphrase": "",
        "subscribers": {
            "http": true,
            "redis": true
        },
        "apiOriginAllow": {
            "allowCors": true,
            "allowOrigin": "http://localhost",
            "allowMethods": "GET POST",
            "allowHeaders": "Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept, Authorization, X-CSRF-TOKEN, X-Socket-Id"
        }
    },
);
