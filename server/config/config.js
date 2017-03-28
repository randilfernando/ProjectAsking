var env = process.env.NODE_ENV || "development"; //To change the environment ("development", "production")

var config = {
    development: {
        //mongodb connection settings
        database: 'mongodb://localhost:27017/asking',
        //server details
        server: {
            host: process.env.host || 'localhost',
            port: process.env.port || '5000'
        }
    },
    production: {
        //mongodb connection settings
        database: 'mongodb://asking:1234@ds060009.mlab.com:60009/asking',
        //server details
        server: {
            host: process.env.host || 'localhost',
            port: process.env.port || '5000'
        }
    }
};

var secretKey = {
    key: 'ABcd12!@'
};

module.exports = {
    config: config[env],
    secretKey: secretKey
};