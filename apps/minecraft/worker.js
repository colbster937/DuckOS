onmessage = function(o) {
	/*importScripts("/vfs?get=server/lib/eaglecraft/classes_server.js");*/
	fetch('/vfs?get=server/lib/eaglecraft/classes_server.js', {
		method: 'GET'
	})
	.then(res => {
		eval(res.text())
	})
	eaglercraftServerOpts = o.data;
	main();
};
