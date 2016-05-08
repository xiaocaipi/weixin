package com.weixin;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

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
		
	}
	
	
	
	
	public static void testFetchWeixin() throws Exception{
		
		HashMap<String, Object> paraMap = new HashMap<String, Object>();
		String url = "http://mp.weixin.qq.com/s?__biz=MjM5NTAyODc2MA==&mid=2654343516&idx=6&sn=70a68ca3dfb5561f411f2a6a79dfa6a3&scene=1&srcid=0506XghVAkDOx2BgMjDIiRct#rd";
		Document doc = null;
		doc = NetUtil.goFetch(url, doc, paraMap);
		Element element = doc.select("#js_content").get(0);
		String content = element.toString();
		File file = new File("G:\\tmp\\test12.txt");
		
		FileUtils.writeStringToFile(file, content, "utf-8");
		
		
		
	}

}
