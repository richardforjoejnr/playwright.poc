let config;

const env = process.env.ENVIRONMENT || 'prod';

try {
    config = require(`./${env}`).default;
} catch (error) {
  console.error(`Configuration file for environment "${env}" not found. Using prod configuration.`);
  config = require('./prod').default; 
}

export default config;