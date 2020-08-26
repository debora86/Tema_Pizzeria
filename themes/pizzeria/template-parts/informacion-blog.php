<header class="informacion-entrada">	
	<div class="fecha">
		<?php echo the_time('d'); ?>
		<span><?php echo the_time('M'); ?></span>
	</div>
	<?php if(is_home()): ?>
	<div class="titulo-entrada">
		<h2><?php the_title(); ?></h2>
	</div>
<?php endif; ?>
</header>
<p class="autor">
	Escrito Por:<span><?php the_author(); ?></span>
</p>
