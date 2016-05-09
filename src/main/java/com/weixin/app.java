package com.weixin;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.io.FileUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.weixin.util.NetUtil;
import com.weixin.util.WeiXinCommon;

import weixin.popular.api.MaterialAPI;
import weixin.popular.api.MediaAPI;
import weixin.popular.api.TokenAPI;
import weixin.popular.bean.media.Media;
import weixin.popular.bean.media.MediaType;
import weixin.popular.bean.media.UploadimgResult;
import weixin.popular.bean.message.Article;
import weixin.popular.bean.token.Token;

public class app {
	
	public static void main(String[] args) throws Exception {
//		Token token = TokenAPI.token("wx436dfcb8a1a76be0","d76669edcde1bd6845c76d7dcedb1899");
//		System.out.println(token.getAccess_token()+"---"+token.getExpires_in());
//		String access_token = token.getAccess_token();
		
//		List<Article> articles = new ArrayList<Article>();
//		Article article = new Article();
//		article.setAuthor("menu");
//		article.setContent("this is a new day ");
////		article.setThumb_media_id("1");
//		article.setTitle("first");
//		articles.add(article);
//		
//		Media media = MaterialAPI.materialAdd_news(token.getAccess_token(),articles );
//		System.out.println(media.getMedia_id());
		
//		File file = new File("/app/soft/180.jpg");
//		UploadimgResult result = MediaAPI.mediaUploadimg(access_token, file);
//		result.get
		
//		Media media = MaterialAPI.materialAdd_material(access_token, MediaType.image, file, null);
//		System.out.println(media.getMedia_id());
//		testFetchWeixin();
		testMoveAd();
		
//		testFetchFirstPic();
		
	}
	
	
	
	
	public static void testFetchWeixin() throws Exception{
		
		HashMap<String, Object> paraMap = new HashMap<String, Object>();
		String url = "http://mp.weixin.qq.com/s?__biz=MzAwODEzMjY2MA==&mid=2656627379&idx=1&sn=a0076b593d6a90e2578de93b3271ca3b&scene=1&srcid=0509bMbM5CkF2RZVV56deaLR#rd";
		Document doc = null;
		doc = NetUtil.goFetch(url, doc, paraMap);
		Element element = doc.select("#js_content").get(0);
		String content = element.toString();
		File file = new File("/tmp/test15.txt");
		String title = doc.select("#activity-name").get(0).text();
		System.out.println(title);
		FileUtils.writeStringToFile(file, content, "utf-8");
		
		
		
	}
	
	
	public static void testFetchFirstPic() throws Exception{
		String url = "http://mp.weixin.qq.com/s?__biz=MzAwODEzMjY2MA==&mid=2656627379&idx=1&sn=a0076b593d6a90e2578de93b3271ca3b&scene=1&srcid=0509bMbM5CkF2RZVV56deaLR#rd";
		Document doc = null;
		HashMap<String, Object> paraMap = new HashMap<String, Object>();
		doc = NetUtil.goFetch(url, doc, paraMap);
		Element element = doc.select("#js_content").get(0);
		////先去封面找
		if(doc.select("#media").size()>0){
			String pic = doc.select("#media").get(0).toString();
			String picUrl = WeiXinCommon.getRegexContent(pic, "\"http(.+?)\"").replace("\"", "");
			WeiXinCommon.downloadPicture(picUrl,"123","/tmp/" );
			
		}else{//用第一张图片
			Elements elements = element.getElementsByTag("img");
			if(elements.size()>0){
				for(int i = 0;i<elements.size();i++){
					String elementString = elements.get(i).toString();
					String lengthString = WeiXinCommon.getRegexContent(elementString, "data-w=\"(.+?)\"");
					lengthString = lengthString.replace("data-w=\"", "").replace("\"", "");
					int len = Integer.parseInt(lengthString);
					if(len>200){
						String picUrl = WeiXinCommon.getRegexContent(elementString, "\"http(.+?)\"").replace("\"", "");
						WeiXinCommon.downloadPicture(picUrl,"123","/tmp/" );
						break;
					}
				}
				
			}
			//用默认图片
			else{
				
			}
		}
		
	}
	
	public static void testMoveAd() throws IOException{
		File file = new File("/tmp/test15.txt");
		
		String content = FileUtils.readFileToString(file, "utf-8");
		
		filterWord(content);
		
	}
	
	private static String filterWord(String content){
		
//		 content = filterWordByTag(content, "p");
		 content = filterWordByTag(content, "section");
		 System.out.println(content);
		 return content;
	}
	
	private static String filterWordByTag(String content,String tagName){

		Document doc = Jsoup.parse(content);
		 String filterword = "公众号,公号,微信号,点击,订阅";
		Elements elements = doc.getElementsByTag(tagName);
		for(int i=0;i<elements.size();i++){
			Element element = elements.get(i);
			String elementString = element.toString().trim();
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
				for(String tmp :elementString.split("\n")){
					content = content.replace(tmp.trim(), "");
				}
				
			}
			//去掉最后的图片关注
			if(i==elements.size()-1 && elementString.contains("data-src")){
			   content = content.replace(elementString, "");
			}
			
			
		}
		
		return content;
	
	}

}
