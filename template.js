define(["require", "text", "knockout", "stringTemplateEngine"], function(require, text, ko) {
	var loader = {
		load: function(name, req, load, config) {
			var onLoad = config.isBuild ? load : function(content) {
					var safeName = inferTemplateName(name);
					ko.templates[safeName] = content;
					load(content);
				};

			text.load(name, req, onLoad, config);
		},
		write: function(pluginName, moduleName, write, config) {
			text.write("text", moduleName, write, config);

			var safeName = inferTemplateName(moduleName);

			write.asModule(pluginName + "!" + moduleName,
				"define(['text!" + moduleName + "', 'knockout', 'stringTemplateEngine'], function (content, ko) {" +
					"ko.templates['" + safeName + "'] = content;" +
				"});\n"
			);
		}
	};

	function inferTemplateName(name) {
		var templateName;

		var index = name.indexOf("!");
		if(index !== -1) {
			//use the template name that is specified
			templateName = name.substring(index + 1, name.length);
		} else {
			//use the file name sans the path as the template name
			var parts = name.split("/");
			templateName = parts[parts.length - 1].split(".").join("-");
		}

		return templateName;
	}

	return loader;
});