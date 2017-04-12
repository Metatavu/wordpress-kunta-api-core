<?php
if(function_exists("register_field_group"))
{/**
	$incidentCatgory = get_category_by_slug('incident-areas');
	$incidentAreas = get_categories();
	
	print_r($incidentAreas); die;
	**/
	register_field_group(array (
			'id' => 'acf_incident',
			'title' => 'Incident',
			'fields' => array (
					array (
							'key' => 'field_58dcb82748bf4',
							'label' => 'Type',
							'name' => 'type',
							'type' => 'select',
							'choices' => array (
									'disruption' => 'Häiriö',
									'severe' => 'Vakava',
							),
							'default_value' => 'disruption',
							'allow_null' => 0,
							'multiple' => 0,
					),
					array (
							'key' => 'field_58dcc0280b3df',
							'label' => 'Description',
							'name' => 'description',
							'type' => 'textarea',
							'required' => 1,
							'default_value' => '',
							'placeholder' => '',
							'maxlength' => '',
							'rows' => '',
							'formatting' => 'none',
					),
					array (
							'key' => 'field_58ddf15cdd7eb',
							'label' => 'Areas',
							'name' => 'areas',
							'type' => 'taxonomy',
							'taxonomy' => 'incident-areas',
							'field_type' => 'checkbox',
							'allow_null' => 0,
							'load_save_terms' => 0,
							'return_format' => 'id',
							'multiple' => 0,
					),
					array (
							'key' => 'field_58dbd75f24ff8',
							'label' => 'Start date',
							'name' => 'start_date',
							'type' => 'date_picker',
							'date_format' => 'yy-mm-dd',
							'display_format' => 'mm.dd.yy',
							'first_day' => 1,
					),
					array (
							'key' => 'field_58dc12752950d',
							'label' => 'Start time',
							'name' => 'start_time',
							'type' => 'text',
							'default_value' => '',
							'placeholder' => '00:00',
							'prepend' => '',
							'append' => '',
							'formatting' => 'html',
							'maxlength' => '',
					),
					array (
							'key' => 'field_58dbd93224ff9',
							'label' => 'End date',
							'name' => 'end_date',
							'type' => 'date_picker',
							'date_format' => 'yy-mm-dd',
							'display_format' => 'mm.dd.yy',
							'first_day' => 1,
					),
					array (
							'key' => 'field_58dc13034d1ba',
							'label' => 'End time',
							'name' => 'end_time',
							'type' => 'text',
							'default_value' => '24:00',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'formatting' => 'html',
							'maxlength' => '',
					),
			),
			'location' => array (
					array (
							array (
									'param' => 'post_type',
									'operator' => '==',
									'value' => 'incident',
									'order_no' => 0,
									'group_no' => 0,
							),
					),
			),
			'options' => array (
					'position' => 'normal',
					'layout' => 'no_box',
					'hide_on_screen' => array (
					),
			),
			'menu_order' => 0,
	));
}
?>