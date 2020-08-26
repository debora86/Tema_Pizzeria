<?php 

/*
Plugin Name: La pizzeria gunterbeg nativos
Plugin Uri:
Description: agregando bloques a gunterberg nativos
Version:1.0
Author:Debora Guzman
Author URI:
License: GPL2
License Uri:
*/
 // aqui se registran todos los bloques
 if(!defined('ABSPATH')) exit;

// categorias personalizas en mis bloques gunterberg
function lapizzeria_categoria_personalizada($categories, $post){

	return array_merge(
		$categories, 
		array(
 			array(
 			 	'slug' => 'lapizzeria',
 			 	'title' => 'La Pizzeria',
 			 	'icon' => 'store'
 			)
		)
	);
 }
add_filter( 'block_categories', 'lapizzeria_categoria_personalizada', 10, 2);

 // registrar bloques Script y css
function lapizzeria_registrar_bloques() {
	//si gunterber no existe
 	if ( !function_exists('register_block_type') ){
 		return;	
 	}
 	// registrar bloques en el editor
 	wp_register_script(
 	'lapizzeria-editor-script', plugins_url('build/index.js', __FILE__), //ARCHIVO CON LOS BLOQUES
 		array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'),filemtime(plugin_dir_path(__FILE__) . 'build/index.js')
 	);
 	// estilos para editor(unicamente)
 	wp_register_style(
 		'lapizzeria-editor-style', plugins_url('build/editor.css', __FILE__), //archivo para el editor
 		array('wp-edit-blocks'),//dependecia
 		filemtime(plugin_dir_path(__FILE__) . 'build/editor.css')
 	);
	// aqui para los bloques front-end and back-end
 	wp_register_style(
 		'lapizzeria-frontend-style', plugins_url('build/style.css', __FILE__), //archivo para el editor
 		array(),//dependecia
 		filemtime(plugin_dir_path(__FILE__) . 'build/style.css')
 	);
 	// cada vez que agregues un bloque en la carpeta debes registrar
 	// arreglo de bloques
 	$blocks = [
 		'lapizzeria/boxes',
 		'lapizzeria/imagenes',
 		'lapizzeria/hero',
 		'lapizzeria/textoimagen',
 		'lapizzeria/contenedor'
 				];

 	//recorrer los bloques 

 	foreach($blocks as $block) {
 		register_block_type($block, array(
 			'editor_script' => 'lapizzeria-editor-script',//js editor
 			'editor_style' => 'lapizzeria-editor-style',//estilo edit
 			'style' => 'lapizzeria-frontend-style' //estilo front
 		));
 	}
 	// registrar un bloque dinamico
 	register_block_type( 'lapizzeria/menu', array(
 	'editor_script' => 'lapizzeria-editor-script',
 			'editor_style' => 'lapizzeria-editor-style',
 			'style' => 'lapizzeria-frontend-style',
 			'render_callback' => 'lapizzeria_especialidades_front_end'  //queri a la BD
 		) 
 	);
}
 add_action('init', 'lapizzeria_registrar_bloques');

 // mostrar los resultados en el front-end
function lapizzeria_especialidades_front_end($atts) {
	// echo "<pre>";
	// var_dump($atts);
	// echo "</pre>";
	// obtener los datos del query

	// extraer los valores
	$cantidad = $atts['cantidadMostrar'] ? $atts['cantidadMostrar'] : 4;
	$titulo_bloque = $atts['tituloBloque'] ? $atts['tituloBloque'] : 'Nuestras Especialidades';
	$tax_query = array();

	// if(isset($atts['categoriaMenu'])){
	
	// 	$tax_query[] = array(
	// 		'taxanomy' => 'categoria-menu',
	// 		'terms' => $atts['categoriaMenu'],
	// 		'field' => 'term_id'	
	// 	);
	// }
// obtener los datos de query
	$especialidades = wp_get_recent_posts(
		array( 
			'post_type' => 'especialidades',
			'post_status' => 'publish',
			'numberposts' => $cantidad,
			'tax_query' => $tax_query 
		));

	if(count($especialidades) == 0 ){
		return 'No hay especialidades';
	}

	$cuerpo = '';
	$cuerpo .= '<h2 class="titulo-menu">';
	$cuerpo .= 	$titulo_bloque;
	$cuerpo .= '</h2>';
	$cuerpo .= '<ul class="nuestro-menu">';

	foreach ($especialidades as $esp):
		# obtener objeto del post
		$post = get_post( $esp['ID'] );
		setup_postdata( $post );
		$cuerpo .=sprintf(
			'<li>
				%1$s
				<div class="platillo">
					<div class="precio-titulo">	
						<h3>%2$s</h3>
						<p>$ %3$s </p>
					</div>
					<div class="contenido-platillo">
						<p>	
							%4$s
						</p>
					</div>
				</div>
			</li>',
			get_the_post_thumbnail($post, 'especialidades'),
			get_the_title($post),
			get_field('precio', $post),
			get_the_content($post)
		);
		wp_reset_postdata();
	endforeach;
	$cuerpo .='</ul>';
	return $cuerpo;	
}
/*agregar libreria cdn lightbox coloque la clase en el href del save de index*/
function lapizzeria_scripts() {
wp_enqueue_style( 'lightbox', 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.1/css/lightbox.min.css', array(), '2.11.1' );
wp_enqueue_script( 'lightboxjs', 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.1/js/lightbox.min.js', array( 'jquery' ), '2.11.1', true);
}
add_action( 'wp_enqueue_scripts', 'lapizzeria_scripts' );