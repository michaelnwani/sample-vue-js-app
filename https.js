module.exports = function() {
	return function (request, response, next){
		if (process.env.NODE_ENV !== 'production' || request.headers['Upgrade-Insecure-Requests'] !== 1) {
			return next();
		}
		response.redirect(301, 'https://' + request.hostname + request.url);
	}
}
