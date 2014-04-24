jQuery.noConflict();
jQuery(document).ready(function($) {
	// alert(1);
	var dataManager				= new MYNAMESPACE.data.DataManager();
	var elementManager			= new MYNAMESPACE.view.ElementManager(dataManager);
	var validationManager		= new MYNAMESPACE.view.ValidationManager();

	elementManager.fixed();	// エレメントを成形
	validationManager.setValidation(dataManager.getInputElementData());	// バリデーションをセット
});