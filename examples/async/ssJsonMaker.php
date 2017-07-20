/**
 * Create json file for sprite sheet image for Creap.js.
 * 
 * @version 1.1.0
 */
<?php
	if (!isset($_POST['name']) || !isset($_POST['data'])) {
		echo 0;
		exit();
	}
	
	echo file_put_contents($_POST['name'], $_POST['data']);
	exit();
