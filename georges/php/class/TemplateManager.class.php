<?php

/**
  BuckUTT - Buckutt est un syst�me de paiement avec porte-monnaie �lectronique.
  Copyright (C) 2011 BuckUTT <buckutt@utt.fr>

  This file is part of BuckUTT

  BuckUTT is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  BuckUTT is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * TemplateManager.class
 * 
 * Classe pour la gestion des templates qui seront utilisés par knockout.js
 * @author BuckUTT <buckutt@utt.fr>
 * @version 2.0
 * @package buckutt
 */
class TemplateManager {

    private $result;

    /**
     * constructeur où on definit les templates à utiliser mais faudrait extraire dans une conf
     * ou alors l'automatiser en scannant le dossier et en creant l'id à partir du nom de fichier (<= trop fat) 
     */
    public function __construct() {
        $this->templatesToUse = array(
            array("id" => "dialog_list_group_price_inc_template", "filename" => "html/dialogListGroupPrice.inc.html"),
            array("id" => "dialog_list_period_inc_template", "filename" => "html/dialogListPeriod.inc.html"),
            array("id" => "dialog_list_point_priority_inc_template", "filename" => "html/dialogListPointPriority.inc.html"),
			
			//pages
            array("id" => "topMenu_template", "filename" => "html/topMenu.view.html"),
            array("id" => "sideMenu_template", "filename" => "html/sideMenu.view.html"),
            array("id" => "period_page_template", "filename" => "html/period.page.html"),
            array("id" => "point_page_template", "filename" => "html/point.page.html"),
            array("id" => "product_page_template", "filename" => "html/product.page.html"),
            array("id" => "fundationSales_page_template", "filename" => "html/fundationSales.page.html"),
            array("id" => "login_page_template", "filename" => "html/login.page.html"),
            array("id" => "main_page_template", "filename" => "html/main.page.html")
        );
        $this->result = $this->getAllTemplates();
    }

    /**
     * ça fait la boucle pour obtenir le html de chaque template
     * @return string 
     */
    private function getAllTemplates() {
        $rtn = "";
        foreach ($this->templatesToUse as $template) {
            $rtn .= $this->loadTemplate($template);
        }
        return $rtn;
    }

    /**
     * ça recupere le contenu du html (file_get_contents) et le mets dans un <script> bien nommé
     * @param array $template
     * @return string 
     */
    private function loadTemplate($template) {
        if (isset($template)) {
            if (isset($template['id']) && isset($template['filename'])) {
                $content = file_get_contents($template['filename']);
                $html = '<script type="text/html" id="' . $template['id'] . '">' . $content . '</script>';
                return $html;
            }
        }
        return "";
    }

    /**
     * getter du html resultant
     * @return string 
     */
    public function getResult() {
        return $this->result;
    }

}

?>
