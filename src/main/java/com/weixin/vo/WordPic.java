package com.weixin.vo;

import weixin.popular.bean.message.Article;

/**
 * @author cai
 *
 */
public class WordPic extends Article {
	
	private String media_id;
	
	private String id;
	
	private String url;
	
	private String updated_time;
	//1 是技术  2是综艺  3是体育  4是理财 5其他
	private String type;

	public String getMedia_id() {
		return media_id;
	}

	public void setMedia_id(String media_id) {
		this.media_id = media_id;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUpdated_time() {
		return updated_time;
	}

	public void setUpdated_time(String updated_time) {
		this.updated_time = updated_time;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	
	
	
	
	
	 

}
