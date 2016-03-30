$(document).ready(function () {
	var botsList = $("#botsList")

	var dataUrl = "./botsData/"
	var indexUrl = "./botsData/index.json"
	var converter = new showdown.Converter()

	var cardTemplate = $.templates($("#cardTemplate").html())

	$.getJSON(indexUrl)
		.then(function (data) {
			console.log(data)
			data.forEach(function (file, index, array) {
				$.getJSON(dataUrl + file)
					.then(function (bot) {
						if (bot.long_desc) {
							parseMarkdown(bot.long_desc, function (markdown) {
								botsList.append(listCard(bot, markdown))
							})
						}

					})
			})


		})


	function listCard (botData, markdown) {
		var cardObj = {
			title: botData.name,
			imgSrc: botData.images[0],
			content: markdown,
			store_link: botData.store_link,
			github_url: botData.github_url,
			bot_link: botData.bot_link
		}

		return (cardTemplate.render(cardObj))
	}


	function parseMarkdown (file, cb) {
		var markdownUrl = dataUrl + file

		$.get(markdownUrl)
			.then(function (data) {
				var parsed = converter.makeHtml(data)
				cb(parsed)
			})
	}
})