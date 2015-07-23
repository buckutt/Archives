<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link type="text/css" href="css/redmond/jquery-ui-1.8.24.custom.css" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <script src='js/lib/vendor/modernizr.custom.min.js' type='text/javascript'></script>
        <script src='js/lib/vendor/LAB.min.js' type='text/javascript'></script>
        <script src='js/include.js' type='text/javascript'></script>
        <?php
        /**
         * plus proof of concept qu'autre chose ce template manager, c applicable pour les scripts JS aussi
         * faut bencher mais ya de forte chance que du load ajax full js soit mieux (cache notamment) que generation d'un mega html initial ...
         * mais l'inclusion de html (template) evite d'avoir des trucs chelou en ajax où chrome par exemple te mets un warning sur la presence de html dans un ajax 
         */
        require_once 'php/class/TemplateManager.class.php';
        $templates = new TemplateManager();
        echo $templates->getResult()
        ?>
        <title class="title">Georges</title>
    </head>
    <body>
        <div id="wrap">
            <div id="header">
                <h1><a href="#">GEORGES</a></h1>
                <h2 class="title"></h2>
            </div>
            <div id="topMenu_container" data-bind="template: {name: 'topMenu_template'}"></div>
            <div id="contentwrap">
                <div id="sideMenu_container" data-bind="template: {name: 'sideMenu_template'}"></div>
                <div id="content">
                </div>

                <div style="clear: both;"></div>
            </div>
            <div id="footer">
                <p> RC1 | <a href="http://www.templatestable.com">Template</a></p>
            </div>

        </div>
		<div id="dialog_list_content"></div>
    </body>
</html>
