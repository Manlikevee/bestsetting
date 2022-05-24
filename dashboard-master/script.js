$(".actions").prepend('<p>Note: Information collected through this form will be used by Krux for the purpose of processing this specific request and may also be used for future communications, such as event invitations and important company updates. You can unsubscribe from these types of communications at any time. Any data collected via this form will be safeguarded by our team in accordance with our privacy policy, <a href="/privacy/">here</a>.  By checking this box, you agree to these terms.</p><p><label><input type="checkbox" id="checkbox"> <em>I agree to these terms.</em> </label></p>');
        
$('.hs-button').prop('disabled', true); // disabled by default

$('#checkbox').click(function() {
   // change on checkbox click
   $('.hs-button').prop('disabled', !$('#checkbox').prop('checked'));
});