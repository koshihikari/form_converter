jQuery.noConflict();
jQuery(document).ready(function($) {
	var elementManager			= new MYNAMESPACE.ElementManager();

	elementManager.setAttrOfElement();
	elementManager.setEnable();

	if (location.host === 'localhosta') {
		$('#username').val('山田').focus().blur();
		$('#userfname').val('太郎').focus().blur();
		$('#usernamekana').val('ヤマダ').focus().blur();
		$('#userfnamekana').val('タロウ').focus().blur();
		$('#userzipcd').val('1234567').focus().blur();
		$('#useraddressstr').val('渋谷区').focus().blur();
		$('#usertel').val('09012345678').focus().blur();
		$('#useremail').val('a@b.com').focus().blur();
		$('#userbirthyear').val('2000').focus().blur();
		$('#userbirthmonth').val('12').focus().blur();
		$('#userbirthday').val('31').focus().blur();
		$('#useroccupation').val('13').focus().blur();

		$('#labeladd').text('東京都品川区東五反田５丁目');
		$('#userprefcd').val(13);
		$('#useraddresscd1').val(109);
		$('#useraddresscd2').val('017005');
		$('#userprefnm').val('東京都');
		$('#usercitynm').val('品川区');
		$('#useraddsubnm').val('東五反田５丁目');
	}
});