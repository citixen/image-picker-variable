(function() {
  data.images = [];

  if (!options.tableName || !options.imageField || !options.valueField) {
    data.error = 'Missing required configuration options';
    return;
  }

  var gr = new GlideRecord(options.tableName);
  if (options.query) {
    gr.addEncodedQuery(options.query);
  }
	
  var sortField = options.sortField || options.valueField;

	gr.orderBy(sortField);
  gr.query();

  while (gr.next()) {
    var imageSysId = gr.getValue(options.imageField);
    var imageUrl = imageSysId ? '/sys_attachment.do?sys_id=' + imageSysId : '';

    data.images.push({
      sys_id: gr.getUniqueValue(),
      image: imageUrl,
      value: gr.getValue(options.valueField),
			sort: gr.getValue(sortField)
    });
  }
})();
