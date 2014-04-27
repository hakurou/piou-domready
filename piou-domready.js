/**
 * Bibliotheque pour executer des fonctions lorsque le dom est chargé
 * @author hakurou
 * @version 1.0.0
 * @created 27/10/2012
 */
(function(){
	
	// Si le namespace n'existe pas on le crée
	if(typeof window.piou == "undefined")
		window.piou = {};
	
	var isDomReady = false;
	
	/**
	 * Fonction d'execution d'un callback en cas de dom chargé
	 * @param callback			Fonction a executer
	 */
	var domReady = function(callback)
	{
		if(isDomReady)
			callback();
		
		if(typeof document.readyState != "undefined" &&
			typeof document.addEventListener != "undefined" &&
			!/loaded|complete/gi.test(document.readyState))
		{
			document.addEventListener("DOMContentLoaded", function(){
				isDomReady = true; 
				callback();
			}, false);
		}
		else if(typeof document.readyState != "undefined")
		{
			var timer = setInterval(function(){
				if(/loaded|complete/gi.test(document.readyState))
				{
					callback();
					clearInterval(timer);
					isDomReady = true;
				}
			}, 10);
		}
		else
		{
			if(typeof domReady.callbackList == "undefined")
				domReady.callbackList = [];
				
			domReady.callbackList.push(callback);
			
			window.onload = function()
			{
				if(domReady.callbackList.length > 0)
				{
					for(var callback in domReady.callbackList)
					{
						domReady.callbackList[callback];
					}
					
					isDomReady = true;
					domReady.callbackList = [];
				}
			};
		}
	};

	domReady.version = "1.0.0";
	window.piou.domReady = domReady;
	
})();