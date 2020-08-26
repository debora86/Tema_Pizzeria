<?php get_header();?>

<?php 
while (have_posts()): the_post(); 

	// <!-- funcion para llamar codigos repetidos -->
	get_template_part('template-parts/loop', 'contenido');
	// aqui se habilitan los comentarios
	comments_template();
	
  endwhile; ?>

 <?php get_footer(); ?>