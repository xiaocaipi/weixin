package com.weixin;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.weixin.util.NetUtil;

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
		testFetchWeixin();
//		testMoveAd();
		
	}
	
	
	
	
	public static void testFetchWeixin() throws Exception{
		
		HashMap<String, Object> paraMap = new HashMap<String, Object>();
		String url = "http://mp.weixin.qq.com/s?__biz=MzIzMzMzNTMwNw==&mid=100000004&idx=1&sn=4c9edbacbc2e3326424fd21a4625006a#rd";
		Document doc = null;
		doc = NetUtil.goFetch(url, doc, paraMap);
		Element element = doc.select("#js_content").get(0);
		String content = element.toString();
		File file = new File("G:\\tmp\\test15.txt");
		
		FileUtils.writeStringToFile(file, content, "utf-8");
		
		
		
	}
	
	public static void testMoveAd() throws IOException{
		File file = new File("G:\\tmp\\test14.txt");
		
		String content = FileUtils.readFileToString(file, "utf-8");
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
			   System.out.println(i);
			}
			
			
		}
		
		System.out.println(content);
		
	}

}
