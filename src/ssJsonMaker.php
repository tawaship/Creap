<?php
	if (!isset($_POST['name']) || !isset($_POST['data'])) {
		echo 0;
		exit();
	}
	
	echo file_put_contents('images/'. $_POST['name'], $_POST['data']);
	exit();
