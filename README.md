A basic widget for user in a Custom type servicenow catalog variable, to provide an image-picker functionality that is missing from the base platform.

Images when selected will populate another variable with a value derived from an association with the image.

Images and their associated values should be stored in a table in ServiceNow. 

This table should contain at least two fields.
- An image type field
- A string field to store the value associated with that image.
It could also contain many other values, to allow you to store all relevant images in a single table and use the widget query option to limit the images shown. 
Consider having a reference field to the catalog item table for example, and an active flag.

The option values for the widget are : 

  "tableName": the name of the table storing the images
  "query": an encoded query string to restrict the records returned from the table
  "imageField": the name of the field in the table that stores the image
  "valueField": the name of the field in the table that stores the value to be associated when that image is picked
  "targetVariable": the name of the variable in the catalog item that you want to have set on selection of the image. This should store a string type value - so any compatible variable type works (for example, choice) 
                    Note : this should almost certainly be a hidden field for end-users on the catalog form submission view.
  "sortField": the name of the field in the table that you want to use to sort the images by
  "maxColumns": an integer value that defines the maximum number of columns in the image grid
  "minColWidth": an integer value that limits the minumum width of each column in the image grid
  "showLabels": a boolean value to indicate whether or not the "value" should be displayed underneath each image


To use the widget, create a "Custom" or "Custom with label" type variable. Add your widget name into the "Widget" field.
In the Default value for that variable, add your option values. For example :

{
  "tableName": "my_image_and_value_table",
  "query": "active=true",
  "imageField": "image",
  "valueField": "value",
  "targetVariable": "selected_value",
  "sortField": "order",
  "maxColumns": 4,
  "minColWidth": 150,
  "showLabels": true
}

This will show a max of 4 columns, at least 150px wide, with labels under the images. 
Images will be loaded from the "image" field on the "my_image_and_value" table. 
Only records with a value of "active" set to "true" will be shown.
They will be sorted based on the "order" value on that table.
When an image in the grid gets selected the variable named "selected_value" will be updated with the value from the "value" field in "my_image_and_value" table record that the image came from.
