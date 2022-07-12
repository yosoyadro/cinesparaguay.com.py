<?php

return [
  'actions' => [
    'item.read' => function ($collectionName,$data) {
      // set collections filter
	  $collections= ['peliculas', 'noticias'];

	   // increment visualization
		if ( in_array($collectionName, $collections) ){

			if($data['visualizaciones'] == null){
				$data['visualizaciones'] = 0;
			}

			// connect to DB
			$container = \Directus\Application\Application::getInstance()->getContainer();
			$dbConnection = $container->get('database');

			// select table
			$tableGateway = new \Zend\Db\TableGateway\TableGateway($collectionName, $dbConnection);

			// set update
			$update = new \Zend\Db\Sql\Update($collectionName);
			$update->where(['id' => $data['id']]);
			$update->set(['visualizaciones' => 2]);

			// update
			$tableGateway->updateWith($update);
		}
    }
  ]
];

?>