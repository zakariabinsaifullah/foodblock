<?php
/**
 * Plugin Name:       Food Product Block
 * Description:       A Custom Gutenberg Block developed with Gutenberg Native Components to showcase affiliate products.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Zakaria Binsaifullah
 * Author URI:        https://makegutenblock.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       food-product-block
 *
 * @package           @wordpress/create-block 
 */

 /**
  * @package Zero Configuration with @wordpress/create-block
  *  [fpb] && [FPB] ===> Prefix
  */

// Stop Direct Access 
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Blocks Final Class
 */

final class FPB_BLOCKS_CLASS {
	public function __construct() {
		// block initialization
		add_action( 'init', [ $this, 'fpb_blocks_init' ] );

	}

	/**
	 * Initialize the plugin
	 */

	public static function init(){
		static $instance = false; 
		if( ! $instance ) {
			$instance = new self();
		}
		return $instance;
	}

	/**
	 * Blocks Registration 
	 */

	public function fpb_register_block( $name, $options = array() ) {
		register_block_type( __DIR__ . '/build/' . $name, $options );
	 }

	/**
	 * Blocks Initialization
	*/
	public function fpb_blocks_init() {
		// register single block
		$this->fpb_register_block( 'food-product' );
	}
}

/**
 * Kickoff
*/

FPB_BLOCKS_CLASS::init();
