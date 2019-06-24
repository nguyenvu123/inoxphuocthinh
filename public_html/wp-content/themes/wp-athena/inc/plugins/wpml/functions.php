<?php
function icl_post_languages(){
	$languages = icl_get_languages('skip_missing=1');
	if ( 1 < count($languages) ) {
		foreach($languages as $l){
			if(!$l['active']) $langs[] = '<a href="'.$l['url'].'" style="text-transform: uppercase;">'.$l['language_code'].'</a>';
		}
		echo join(' / ', $langs);
	}
}