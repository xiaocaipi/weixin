package com.weixin.service;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.weixin.dao.MaterialDao;
import com.weixin.util.WeiXinCommon;
import com.weixin.vo.Material;

import weixin.popular.api.MaterialAPI;
import weixin.popular.api.MediaAPI;
import weixin.popular.bean.media.Media;
import weixin.popular.bean.media.MediaType;
import weixin.popular.bean.media.UploadimgResult;
import weixin.popular.bean.token.Token;

public class MaterialService {
	@Autowired(required=true)
	 @Qualifier("materialDao") 
	private MaterialDao materialDao;
	
	public int insertMaterialWoldPic(){
		
		Token token = WeiXinCommon.getToken();
		String access_token = token.getAccess_token();
		
		String local_path ="/app/soft/180.jpg";
		
		File file = new File(local_path);
		
		Media media = MaterialAPI.materialAdd_material(access_token, MediaType.image, file, null);
		
		this.insertMaterialPic(local_path, media.getMedia_id(), null, null, MediaType.image.uploadType());
		
		
		
		
		return 1;
	}
	
	public int insertMaterialPic(String local_path,String media_id,String parent_media_id,String url,String type ){
		Material material = new Material();
		material.setLocal_path(local_path);
		material.setMedia_id(media_id);
		material.setType(type);
		material.setParent_media_id(parent_media_id);
		material.setUrl(url);
		materialDao.insertMaterial(material);
		return 1;
	}

}
