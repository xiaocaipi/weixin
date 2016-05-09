package com.weixin.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.weixin.vo.Material;
import com.weixin.vo.WordPic;

@Repository("materialDao")
public class MaterialDao extends BaseDao {

	private final static String NAME_SPACE = "com/weixin/dao/sql/material.xml";

	public void insertMaterial(Material material) {
		this.insertObject(NAME_SPACE + ".insertMaterial", material);

	}

	public Material getMaterial(HashMap<String, Object> paraMap) {
		
		return (Material) this.getForObject(NAME_SPACE + ".getMaterial", paraMap);
	}

	public void insertWordPic(WordPic article) {
		this.insertObject(NAME_SPACE + ".insertWordPic", article);
		
	}

	public void updateMaterialPic(Material thumb_media) {
		this.updateObject(NAME_SPACE + ".updateMaterialPic", thumb_media);
		
	}

	public List<WordPic> getWordPicList(Map<String, String> paraMap) {
		
		return this.getObjectForList(NAME_SPACE + ".getWordPicList", paraMap);
	}

}
