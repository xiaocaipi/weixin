package com.weixin.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.weixin.dao.MaterialDao;
import com.weixin.util.NetUtil;
import com.weixin.util.WeiXinCommon;
import com.weixin.util.WeiXinPopularUtil;
import com.weixin.vo.Material;
import com.weixin.vo.WordPic;

import weixin.popular.api.MaterialAPI;
import weixin.popular.api.MediaAPI;
import weixin.popular.bean.BaseResult;
import weixin.popular.bean.media.Media;
import weixin.popular.bean.media.MediaType;
import weixin.popular.bean.media.UploadimgResult;
import weixin.popular.bean.message.Article;
import weixin.popular.bean.token.Token;
import weixin.popular.util.JsonUtil;
@Service
public class MaterialService {
	@Autowired(required=true)
	 @Qualifier("materialDao") 
	private MaterialDao materialDao;
	
	private String top1String =" <p style=\"margin-top: 5px; max-width: 100%; min-height: 1em; white-space: normal; color: rgb(62, 62, 62); font-family: sans-serif; text-align: center; line-height: normal; box-sizing: border-box !important; word-wrap: break-word !important; background-color: rgb(255, 255, 255);\"><span style=\"max-width: 100%; color: rgb(192, 80, 77); font-size: 12px; box-sizing: border-box !important; word-wrap: break-word !important;\">中国第一感官传媒 最受欢迎图文公号</span><span style=\"max-width: 100%; color: rgb(192, 80, 77); font-size: 12px; box-sizing: border-box !important; word-wrap: break-word !important;\"></span></p>";
	private String top2String =" <p style=\"margin-top: 5px; max-width: 100%; min-height: 1em; white-space: normal; font-family: sans-serif; text-align: center; line-height: normal; box-sizing: border-box !important; word-wrap: break-word !important; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(127, 127, 127); max-width: 100%; font-size: 12px; box-sizing: border-box !important; word-wrap: break-word !important;\">点击题目下方蓝字关注 </span><span style=\"max-width: 100%; font-size: 12px; box-sizing: border-box !important; word-wrap: break-word !important;\"><span style=\"color:#366092\"><strong>叮咚铛</strong></span></span></p>";
	private String end1String =" <p style=\"text-align: center;\"><img data-s=\"300,640\" data-type=\"jpeg\" data-src=\"http://mmbiz.qpic.cn/mmbiz/T1JAyOWJPIIXvGRQicO48rsuYcDEqD6FA9B8BfzyOu7bicV3LHtjzUToW6r3nDTibSOUew8Lfqe9yyyk1H6dNpOSQ/0?wx_fmt=jpeg\" data-ratio=\"0.5485611510791367\" data-w=\"\" /><br /></p> ";
	
	private Token token = WeiXinCommon.getToken();
	private String access_token = token.getAccess_token();
	
	public int insertMaterialWoldPic() throws Exception{
		

		
		String url = "http://mp.weixin.qq.com/s?__biz=MjM5NTAyODc2MA==&mid=2654343516&idx=6&sn=70a68ca3dfb5561f411f2a6a79dfa6a3&scene=1&srcid=0506XghVAkDOx2BgMjDIiRct#rd";
		Document doc = null;
		HashMap<String, Object> fetchMap = new HashMap<String, Object>();

		fetchMap.put("id", 2);
		Material thumb_media = materialDao.getMaterial(fetchMap);
		String thumb_media_id = thumb_media.getMedia_id();
		
		doc = NetUtil.goFetch(url, doc, fetchMap);
		Element element = doc.select("#js_content").get(0);
		String content = element.toString();
		
		List<Article> articles = new ArrayList<Article>();
		WordPic article = new WordPic();
		article.setAuthor("menu");
		article.setContent(content);
		article.setThumb_media_id(thumb_media_id);
		article.setTitle("first1");
		articles.add(article);		
		
		Media media = MaterialAPI.materialAdd_news(access_token, articles);
		String word_pic_media_id = media.getMedia_id();
		article.setMedia_id(word_pic_media_id);
		
		//插入word_pic 表
		materialDao.insertWordPic(article);
		//更新图片信息
		if(StringUtils.isEmpty(thumb_media.getParent_media_id() )){
			thumb_media.setParent_media_id(word_pic_media_id);
			materialDao.updateMaterialPic(thumb_media);
		}
		
		
		
		
		return 1;
	}
	
	
	public int updateMaterialWoldPic() throws IOException{
		File file = new File("G:\\tmp\\test14.txt");
		String content = FileUtils.readFileToString(file, "utf-8");
		
		content = this.filterWord(content);
		
		content = this.insertMyAd(content);
		
		HashMap<String, Object> fetchMap = new HashMap<String, Object>();

		fetchMap.put("id", 2);
		Material thumb_media = materialDao.getMaterial(fetchMap);
		String thumb_media_id = thumb_media.getMedia_id();
		
		List<Article> articles = new ArrayList<Article>();
		Article article = new Article();
		article.setAuthor("menu22");
		article.setContent(content);
		article.setThumb_media_id("KfMPvMmE-jXmfULPO8TEZtLGfgu0NVGWj4hRxnVh2CA");
		article.setTitle("first333");
		article.setShow_cover_pic("1");
		articles.add(article);	
		BaseResult result= WeiXinPopularUtil.materialUpdate_news(access_token, "KfMPvMmE-jXmfULPO8TEZjsR_SE4vfucgh9rexZTiBs", 0, articles);
		
		return 1;
	}
	
	
	//第一要存数据库 第二要存到微信里面去
	public int insertMaterialPic(String local_path,String parent_media_id,String url ){
		File file = new File(local_path);
		Media media = MaterialAPI.materialAdd_material(access_token, MediaType.image, file, null);
		String type = MediaType.image.uploadType();
		String media_id =media.getMedia_id();
		Material material = new Material();
		material.setLocal_path(local_path);
		material.setMedia_id(media_id);
		material.setType(type);
		material.setParent_media_id(parent_media_id);
		material.setUrl(url);
		materialDao.insertMaterial(material);
		return 1;
	}
	
	private String filterWord(String content){
		
		Document doc = Jsoup.parse(content);
		 String filterword = "公众号,公号,微信号";
		Elements elements = doc.getElementsByTag("p");
		for(int i=0;i<elements.size();i++){
			Element element = elements.get(i);
			String elementString = element.toString();
			String [] filterArray = filterword.split(",");
			boolean isContain = false;
			for(String filter:filterArray){
				if(elementString.contains(filter)){
					isContain = true;
				}
			}
			//去掉有公众号的敏感词的一段
			if(isContain){
				content = content.replace(elementString, "");
			}
			//去掉最后的图片关注
			if(i==elements.size()-1 && elementString.contains("data-src")){
			   content = content.replace(elementString, "");
			}
			
			
		}
		
		return content;
	}
	
	private String insertMyAd(String content){
		content = top1String+top2String+content+end1String;
		return content;
	}
	
	

}
