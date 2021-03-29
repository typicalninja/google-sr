const search = require('./index');
const { getDescription, parseUrl, PrepareUrl } = require('./utils.js');
const url = 'https://www.youtube.com/watch%3Fv%3D8k-zyUyuvlM&sa=U&ved=2ahUKEwivl6j3qtXvAhWMVc0KHfyiD8MQtwIwDXoECAUQAQ&usg=AOvVaw24MiVlvcYClTo1CUNXaJvD'
search('node.js', { safe: false }).then(r => console.log(r.searchResults))
