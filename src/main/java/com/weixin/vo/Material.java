package com.weixin.vo;

public class Material {

	public Material() {

	}

	public Material(String media_id,String parent_media_id,String url,String local_path,String type  ) {

		this.media_id = media_id;
		this.parent_media_id = parent_media_id;
		this.url = url;
		this.local_path = local_path;
		this.type = type;
	
	}

	private Integer id;

	private String media_id;

	private String parent_media_id;
	// 图片在微信上的url
	private String url;

	private String local_path;

	private String type;


	public String getMedia_id() {
		return media_id;
	}

	public void setMedia_id(String media_id) {
		this.media_id = media_id;
	}

	public String getParent_media_id() {
		return parent_media_id;
	}

	public void setParent_media_id(String parent_media_id) {
		this.parent_media_id = parent_media_id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getLocal_path() {
		return local_path;
	}

	public void setLocal_path(String local_path) {
		this.local_path = local_path;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	

}
