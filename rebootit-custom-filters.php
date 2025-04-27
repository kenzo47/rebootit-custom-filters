<?php
/*
Plugin Name: Reboot-IT Custom SE Filters
Plugin URI: https://reboot-it.be
Description: Volledig aangepaste filtering logica voor ShopEngine categorieën, inclusief parent/child selectie, correcte URL updates en AJAX werking.
Version: 1.0
Author: Reboot-IT
Author URI: https://reboot-it.be
License: GPL2
*/

if (!defined('ABSPATH')) {
    exit;
}

// Verwijder standaard ShopEngine filter script
add_action('wp_enqueue_scripts', function() {
    wp_dequeue_script('shopengine-widgets-filter');

    // Laad ons eigen filter script
    wp_enqueue_script(
        'rebootit-custom-filters',
        plugin_dir_url(__FILE__) . 'rebootit-custom-filter-handler.js',
        array('jquery'),
        '1.0',
        true
    );
}, 20);
?>
