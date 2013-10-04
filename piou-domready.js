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
	
	/**
	 * Fonction d'execution d'un callback en cas de dom chargé
	 * @param callback			Fonction a executer
	 */
	var domReady = function(callback)
	{
		if(typeof document.addEventListener != "undefined")
		{
			document.addEventListener("DOMContentLoaded", callback, false);
		}
		else if(typeof document.readyState != "undefined")
		{
			var timer = setInterval(function(){
				if(/loaded|complete/gi.test(document.readyState))
				{
					callback();
					clearInterval(timer);
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
					
					domReady.callbackList = [];
				}
			};
		}
	};

	domReady.version = "1.0.0";
	window.piou.domReady = domReady;
	
})();