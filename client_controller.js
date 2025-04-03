api.controller=function($scope, $timeout) {
  var c = this;
  
	$scope.selectedImage = null;
	$scope.isReadOnly = false;
  
  // Compute column count from options
  var colCount = parseInt($scope.options.maxColumns, 10);
  if (isNaN(colCount) || colCount < 1) {
    colCount = 3; // default fallback
  }
	// Use that info to figure out column widths
	var minColWidth = $scope.options.minColWidth || 150;
	var columnGap = 12;
	var totalWidth = (minColWidth * colCount) + (columnGap * (colCount - 1));

	$scope.gridStyle = {
		'display': 'grid',
		'grid-template-columns': 'repeat(auto-fit, minmax(' + minColWidth + 'px, 1fr))',
		'gap': columnGap + 'px',
		'max-width': totalWidth + 'px',
		'margin': '0 auto' // center it
	};

  $scope.selectImage = function(img) {
		if ($scope.isReadOnly) return;
    $scope.selectedImage = img;

    var gForm = $scope.page && $scope.page.g_form;

    if (gForm && $scope.options.targetVariable) {
      gForm.setValue($scope.options.targetVariable, img.value);
    } else {
      console.warn('g_form not available or targetVariable not set');
    }
  };
	
  // Auto-select the matching image on load
  $scope.$watch('data.images', function(images) {
    if (!Array.isArray(images) || images.length === 0) return;
		
		var selectedValue = null;

		// First try to get value from g_form (editable form context)
		var gForm = $scope.page && $scope.page.g_form;

		// Use g_form.isReadOnly — supported in Service Portal
		if (gForm && $scope.options.targetVariable) {
			$scope.isReadOnly = gForm.isReadOnly($scope.options.targetVariable);
			selectedValue = gForm.getValue($scope.options.targetVariable);
		}

		// Fallback for post-submission views
		if (!gForm || !$scope.options.targetVariable) {
			$scope.isReadOnly = true;
		}

		if (gForm && $scope.options.targetVariable) {			
			selectedValue = gForm.getValue($scope.options.targetVariable);
		}

		// Fallback: use data.variable.value (read-only / submitted view)
		if (!selectedValue && $scope.data.variable && $scope.data.variable.value) {
			selectedValue = $scope.data.variable.value;
		}

		if (selectedValue) {
			for (var i = 0; i < images.length; i++) {
				if (images[i].value === selectedValue) {
					$scope.selectedImage = images[i];
					break;
				}
			}
		}

  });
}
