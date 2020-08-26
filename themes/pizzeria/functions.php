<?php 
// aqui para buscar imagenes destacadas en las paginas wp
function pizzeria_setup(){
	/* titulos para el SEO*/
	add_theme_support('title-tag');

	/* Gutenberg*/
	// soporte style por defecto de gunterbert
	add_theme_support('wp-block-styles');
	// soporte para el contenido completo
	add_theme_support( 'align-wide' );
	 //paletas de colores 
	add_theme_support( 'editor-color-palette', array(
		
		array(
		'name' =>'Rojo' , 
	    'slug' =>'rojo',
	    'color' =>'#a61206'
		), 
         array(
		'name' =>'Naranja' , 
	    'slug' =>'naranja',
	    'color' =>'#F19F30'
		),  
		 array(
		'name' =>'Verde' , 
	    'slug' =>'verde',
	    'color' =>'#127427'
		),
		 array(
		'name' =>'Blanco' , 
	    'slug' =>'blanco',
	    'color' =>'#FFFFFF'
		),
		 array(
		'name' =>'Negro' , 
	    'slug' =>'negro',
	    'color' =>'#000000'
		)      	
 	));
 	// deshabilita los colores personalizados 
	add_theme_support( 'disable-custom-colors');

	// imagenes destacadas
	add_theme_support('post-thumbnails');
	// tamaños de imagenes
	add_image_size( 'nosotros', 437, 291, true);
	add_image_size( 'especialidades',615, 515, true );
	add_image_size( 'especialidades_portrait', 435, 526, true );
}
add_action('after_setup_theme','pizzeria_setup');
//hasta aqui
function lapizzeria_styles(){

	wp_enqueue_style( 'normalize', 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css', array(), '8.0.1' );

	// wp_enqueue_style('slicknavcss', get_stylesheet_uri(). '/css/slicknav.min.css', array('normalize'), '1.0.10');
	 wp_enqueue_style('slicknavcss', 'https://cdnjs.cloudflare.com/ajax/libs/SlickNav/1.0.10/slicknav.min.css', array('normalize'), '1.0.10');

	wp_enqueue_style( 'googlefonts', 'https://fonts.googleapis.com/css2?family=Open+Sans:ital@1&family=Raleway:ital,wght@0,400;700,600;0,900;1,200&display=swap', array(), '1.0.0' );

	wp_enqueue_style('style', get_stylesheet_uri(), array('normalize'), '1.0.0');
// script
	wp_enqueue_script('slicknavJS',get_template_directory_uri(). ' /js/jquery.slicknav.min.js', array('jquery'), '1.0.10', true);

	wp_enqueue_script( 'scripts',get_template_directory_uri(). '/js/scripts.js', array('jquery'), '1.0', true);

}
add_action( 'wp_enqueue_scripts', 'lapizzeria_styles');
 
 // menus
  function lapizzeria_menus(){
  	register_nav_menus( array(
  		'header-menu' => 'Header Menu',
  		'redes-sociales' => 'Redes Sociales' 
  	));
}
add_action( 'init', 'lapizzeria_menus' );
/* zona de widget*/

function pizzeria_widgets(){
	register_sidebar( array(
		'name' => 'Blog Sidebars',
		'id' => 'blog_sidebar',
		'before_widget' => '<div class="widget">',
		'after_widget' => '</div>',
		'before_title' => '<h3>',
		'after_title' => '</h3>'
	));
	
} 
add_action( 'widgets_init', 'pizzeria_widgets' );
/*agregar botones a paginador*/
function pizzeria_botones_paginador() {
	return 'class="boton boton-secuendario"';
} 
add_filter( 'next_posts_link_attributes','pizzeria_botones_paginador');
add_filter( 'previous_posts_link_attributes', 'pizzeria_botones_paginador');