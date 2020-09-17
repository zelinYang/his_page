<html>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<head>
	<script src="jquery.min.js" type="text/javascript"></script>
	<script src="from-validate.js" type="text/javascript"></script>
	<script type="text/javascript">
		$(function(){
			// 初始化要校验的表单
			validate.init($('#editForm'));
			
			$('#btn_sub').click(function (){
				//执行校验 validate.valid(callSuccess， callError)
				validate.valid(
						function (){
							alert("OK");
						}, 
						
						function (m, o){
							alert(m);
							}
						);
			});
		});
	
	</script>
</head>
<body>
<form id="editForm" action="">
	<input name="aa" adapter="required,minLen" value="" minLen="5" required-msg="aa not null" minLen-msg="aa not len"/>
	<br />
	<input name="bb" adapter="required,range" min="2" max="6" value="" required-msg="bb not null" range-msg="bb not range"/>
	<br />
	<input name="cc" adapter="required,int" min="2" max="6" value="" required-msg="cc not null" int-msg="cc not int "/>
	<br />
	
	<input name="dd" adapter="required,number" min="2" max="6" value="" required-msg="dd not null" number-msg="dd not number "/>
	<br />
	
	<input name="ee" adapter="required,float" min="2" max="6" value="" scale="2" required-msg="ee not null" float-msg="ee not float "/>
	<br />
	<button type="button" id="btn_sub">&nbsp;保&nbsp;&nbsp;存&nbsp;</button>
</form>
</body>
</html>
