package com.weixin.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
import com.weixin.vo.WordPicItem;

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
	
	
	private String defaultPath ="/home/caidanfeng733/weixin/pic/";
//	private String defaultPath ="G:\\project\\weixin\\pic\\";
	private String defaultMediaId = "KfMPvMmE-jXmfULPO8TEZiPw24jA60WaBcPCl1ZirIE";
	
	private String sourceUrl ="http://www.wxtuiguang.cn:9090/weixin/dong.htm";
	
	public int insertMaterialWoldPic(Map<String, String> para) throws Exception{
		
		String paraUrl = para.get("url");
		String paratype = para.get("type");
		
		
		String url = paraUrl;
		Document doc = null;
		HashMap<String, Object> fetchMap = new HashMap<String, Object>();

		
		
		doc = NetUtil.goFetch(url, doc, fetchMap);
		Element element = doc.select("#js_content").get(0);
		//获取摘要
		String text = element.text();
		String digest = this.getDigest(text);
		if(text.length()>54){
			
		}
		
		String content = element.toString();
		content = this.filterWord(content);
		content = this.insertMyAd(content);
		String media_id = this.dealThumbPic(doc);
		if(StringUtils.isEmpty(media_id)){
			media_id = defaultMediaId;
		}
		fetchMap.put("media_id", media_id);
		Material thumb_media = materialDao.getMaterial(fetchMap);
		String thumb_media_id = thumb_media.getMedia_id();
		
		String title = doc.select("#activity-name").get(0).text();
		
		List<Article> articles = new ArrayList<Article>();
		WordPic article = new WordPic();
		article.setAuthor("menu");
		article.setContent(content);
		article.setThumb_media_id(thumb_media_id); 
		article.setTitle(title);
		article.setDigest(digest);
		article.setContent_source_url(sourceUrl);
		article.setType(paratype);
		articles.add(article);		
		
		Media media = MaterialAPI.materialAdd_news(WeiXinCommon.getToken(), articles); 
		String word_pic_media_id = media.getMedia_id();
		article.setMedia_id(word_pic_media_id);
		//获取url
		WordPicItem item = this.getMaterialWoldPic(word_pic_media_id);
		String word_pic_url = item.getNews_item().get(0).getUrl();
		article.setUrl(word_pic_url);
		
		//插入word_pic 表
		materialDao.insertWordPic(article);
		//更新图片信息
		if(StringUtils.isEmpty(thumb_media.getParent_media_id() )){
			thumb_media.setParent_media_id(word_pic_media_id);
			materialDao.updateMaterialPic(thumb_media);
		}
		
		
		
		
		return 1;
	}
	
	public WordPicItem   getMaterialWoldPic(String media_id){
		WordPicItem item = WeiXinPopularUtil.materialGet_material_newsItem(WeiXinCommon.getToken(), media_id);
		return item;
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
		BaseResult result= WeiXinPopularUtil.materialUpdate_news(WeiXinCommon.getToken(), "KfMPvMmE-jXmfULPO8TEZjsR_SE4vfucgh9rexZTiBs", 0, articles);
		
		return 1;
	}
	
	
	public int synchroMaterialWoldPic(String media_id) throws IOException{
		
		WordPicItem item = this.getMaterialWoldPic(media_id);
		WordPic wordpic = item.getNews_item().get(0);
		wordpic.setMedia_id(media_id);
		materialDao.updateMaterialWordPic(wordpic);
		
		
		return 1;
	}
	
	
	//第一要存数据库 第二要存到微信里面去
	public String  insertMaterialPic(String local_path,String parent_media_id,String url ){
		File file = new File(local_path);
		Media media = MaterialAPI.materialAdd_material(WeiXinCommon.getToken(), MediaType.image, file, null);
		String type = MediaType.image.uploadType();
		String media_id =media.getMedia_id();
		Material material = new Material();
		material.setLocal_path(local_path);
		material.setMedia_id(media_id);
		material.setType(type);
		material.setParent_media_id(parent_media_id);
		material.setUrl(url);
		materialDao.insertMaterial(material);
		return media_id;
	}
	
	private String filterWord(String content){
		
		Document doc = Jsoup.parse(content);
		 String filterword = "公众号,公号,微信号,点击,订阅";
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
			//去掉有公众号的敏感词的一段,在头尾的位置才去掉
			boolean isPosition = false;
			if(i<5 || i>elements.size()-5){
				isPosition =true;
			}
			if(isContain && isPosition){
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
	
	private String  dealThumbPic(Document doc){
		
		Element element = doc.select("#js_content").get(0);
		String fileName = UUID.randomUUID().toString();
		String return_media_id = "";
		////先去封面找
		if(doc.select("#media").size()>0){
			String pic = doc.select("#media").get(0).toString();
			String picUrl = WeiXinCommon.getRegexContent(pic, "\"http(.+?)\"").replace("\"", "");
			String localPath = WeiXinCommon.downloadPicture(picUrl,fileName,defaultPath );
			return_media_id = this.insertMaterialPic(localPath, null, null);
			
		}else{//用第一张图片
			Elements elements = element.getElementsByTag("img");
			if(elements.size()>0){
				for(int i = 0;i<elements.size();i++){
					String elementString = elements.get(i).toString();
					String lengthString = WeiXinCommon.getRegexContent(elementString, "data-w=\"(.+?)\"");
					lengthString = lengthString.replace("data-w=\"", "").replace("\"", "");
					if(!StringUtils.isNumeric(lengthString)||StringUtils.isEmpty(lengthString)){
						continue;
					}
					int len = Integer.parseInt(lengthString);
					if(len>200){
						String picUrl = WeiXinCommon.getRegexContent(elementString, "\"http(.+?)\"").replace("\"", "");
						String localPath = WeiXinCommon.downloadPicture(picUrl,"123","/tmp/" );
						return_media_id = this.insertMaterialPic(localPath, null, null);
						break;
					}
				}
				
			}
			//用默认图片
			else{
				return_media_id = "";
			}
		}
		return return_media_id;
		
	}
	//获取摘要
	private String getDigest(String text){
		String returnText = "";
		if(text.length()>54){
			returnText = text.substring(0,54);
		}else{
			returnText = text.substring(0,text.length());
		}
		return returnText;
	}

	public List<WordPic> getWordPicList(Map<String, String> paraMap) {
		
		return materialDao.getWordPicList(paraMap);
	}
	
	

}
