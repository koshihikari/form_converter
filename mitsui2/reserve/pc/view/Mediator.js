

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.Mediator');
	MYNAMESPACE.view.Mediator = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.Mediator.prototype = {
		 _instances				: {}
		,initialize: function(RemainingItemsManagerInstance,RealtimeCheckManagerInstance,TimerSolutionManagerInstance,AutoAddressManagerInstance) {//初期設定的な
			var thisObj = this;
			_.bindAll(
				this
				,'setEvent'
				,'onChangeReminingItemsLength'
				,'onChangeAddressNameTimer'
			);
			this._instances = {//
				 'RemainingItemsManager'			: RemainingItemsManagerInstance
				,'RealtimeCheckManager'				: RealtimeCheckManagerInstance
				,'TimerSolutionManager'				: TimerSolutionManagerInstance
				,'AutoAddressManager'				: AutoAddressManagerInstance
			}
		}
		,setEvent: function(event) {
			var thisObj = this;
			// $(thisObj._instances['RealtimeCheckManager'])
			// 	.on('onChangeBlankLength', function(event) {
			// 		thisObj._instances['RemainingItemsManager'].remainingItemsCheck();
			// 	})
			$(thisObj._instances['RealtimeCheckManager'])
				.on('onChangeBlankLength', thisObj.onChangeReminingItemsLength)
			$(thisObj._instances['TimerSolutionManager'])
				.on('onChangeBlankLength', thisObj.onChangeReminingItemsLength)
			$(thisObj._instances['AutoAddressManager'])
				.on('onChangeAddressName', function(event,N1,N2,T1,T2,T3){
// alert('here is medi'+','+N1+','+N2+','+T1+','+T2+','+T3)

					thisObj._instances['TimerSolutionManager'].timerSolutionAddressAndPlaceholderForIE10(N1,N2,T1,T2,T3);
			})
			// $(thisObj._instances['AutoAddressManager'])
			// 	.on('onChangeAddressName', thisObj.onChangeAddressNameTimer)
		}
		,onChangeReminingItemsLength: function(event) {
			var thisObj = this;
			thisObj._instances['RemainingItemsManager'].remainingItemsCheck();
		}
		,onChangeAddressNameTimer: function(event) {
			var thisObj = this;
			// thisObj._instances['TimerSolutionManager'].timerSolutionAddressAndPlaceholderForIE10();
		}
	}
});