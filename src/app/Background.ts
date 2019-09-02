
/**
 * 'browserAction' field depends on 'browser_action' in manifest.json
 * you can use either 'browser_action' or 'page_action' can't use both in manifest.json
 */
chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
	chrome.declarativeContent.onPageChanged.addRules([{
		actions: [new chrome.declarativeContent.ShowPageAction()],
		conditions: [new chrome.declarativeContent.PageStateMatcher({
			pageUrl: {hostEquals: "developer.chrome.com"}
		})]
	}]);
});
