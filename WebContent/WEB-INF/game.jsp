<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Tetris</title>
	<link rel="stylesheet" href="css/game.css">
</head>

<body>
	<table><tbody>
	<%for(int i = 0; i < (Integer)request.getAttribute("height"); i++) {%>
			<tr>
			<%for(int j = 0; j < (Integer)request.getAttribute("width"); j++) {%>
				<td id=<%=""+j+i %>></td>
		<%}%>
		</tr>
	<%}%>
	</tbody></table>
</body>

<script type="text/javascript" src="javascript/game.js"></script>
</html>