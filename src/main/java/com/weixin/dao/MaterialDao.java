package com.weixin.dao;

import org.springframework.stereotype.Repository;

import com.weixin.vo.Material;

@Repository("materialDao")
public class MaterialDao extends BaseDao {

	private final static String NAME_SPACE = "com/weixin/dao/sql/material.xml";

	public void insertMaterial(Material material) {
		this.insertObject(NAME_SPACE + ".insertMaterial", material);

	}

}
